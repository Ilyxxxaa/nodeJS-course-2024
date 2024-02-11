import cluster, { Worker } from 'cluster';
import os from 'os';
import http from 'http';
import 'dotenv/config.js';
import { getDataFormPOSTRequest } from '../utils/getDataFromPOSTRequest';
import { router } from '../router';

const PORT = +process.env.PORT! || 4000;

if (cluster.isPrimary) {
  let currentWorker: number = -1;
  const workers: Worker[] = [];
  const servers: string[] = [];
  const ports: number[] = [];

  const workersNumber = os.cpus().length - 1;

  for (let i = 1; i <= workersNumber; i++) {
    const newPort = PORT + i;
    ports.push(newPort);
    servers.push(`localhost:${newPort}`);
    const worker = cluster.fork();
    workers.push(worker);
  }

  workers.forEach((w) => {
    w.on('message', (message) => {
      workers.forEach((w) => w.send(JSON.stringify(message)));
    });
  });

  const masterServer = http.createServer(async (req, res) => {
    res.setHeader('Content-Type', 'application.json');

    const body = req.method === 'POST' || req.method === 'PUT' ? await getDataFormPOSTRequest(req) : null;
    const requestData = JSON.stringify(body);

    currentWorker === workers.length - 1 ? (currentWorker = 0) : currentWorker++;

    console.log(`Sending request ${req.method} to ${servers[currentWorker]}`);

    const options: http.RequestOptions = {
      hostname: 'localhost',
      port: ports[currentWorker],
      path: req.url,
      method: req.method,
    };

    const request = http.request(options, async (response) => {
      response.setEncoding('utf-8');
      res.statusCode = response.statusCode!;
      if (response.statusCode === 204) {
        res.end();
      }
      response.on('data', (chunk) => {
        res.end(chunk);
      });
    });

    if (req.method !== 'GET') {
      request.write(requestData);
    }

    request.end();
  });

  masterServer.listen(PORT, () => {
    console.log(`Main server started on port ${PORT}`);
  });
} else {
  const workerId: number = cluster.worker!.id;
  const CHILD_PORT = PORT + workerId;
  http.createServer(router).listen(CHILD_PORT, () => {
    console.log(`Worker is running on ${process.env.HOST || 'localhost'}:${CHILD_PORT}. PID: ${process.pid}`);
  });
}
