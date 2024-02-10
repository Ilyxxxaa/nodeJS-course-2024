import os from 'os';
import http from 'http';
import { router } from './src/router';

// import dotenv from "dotenv";
// dotenv.config();

console.log(os.homedir());
console.log(process.env.NAME);

const server = http.createServer(router).listen(4500, () => {
  console.log('server is runnning');
});

server.on('request', () => {
  console.log('request');
});
