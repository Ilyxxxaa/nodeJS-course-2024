import { IncomingMessage } from 'http';
import { User } from '../types';

export const getDataFormPOSTRequest = (req: IncomingMessage): Promise<User> => {
  try {
    return new Promise((resolve) => {
      req.setEncoding('utf-8');
      let chunks: string = '';

      req.on('data', (chunk) => {
        chunks += chunk;
      });

      req.on('end', () => {
        resolve(chunks ? JSON.parse(chunks) : {});
      });

      req.on('error', () => {
        throw new Error();
      });
    });
  } catch {
    throw new Error();
  }

  //   req.setEncoding("utf-8");
};
