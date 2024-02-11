import http from 'http';
import { router } from './src/router';

// import dotenv from 'dotenv';
// dotenv.config();

const PORT = process.env.PORT || 5000;
const HOST: string = process.env.HOST || 'localhost';
const pid = process.pid;

const server = http.createServer(router).listen(PORT, () => {
  console.log(`Server is running on ${HOST}:${PORT}. PID: ${pid}`);
});

process.on('SIGINT', () => {
  server.close(() => {
    process.exit(0);
  });
});

process.on('exit', () => {
  server.close(() => {
    process.exit(0);
  });
});
