import { ServerResponse, IncomingMessage } from 'http';
import userController from './controllers/userController';
import { responseHandler } from './utils/responseHandler';
import { ErrorMessages } from './constants';
import cluster from 'cluster';

cluster.worker?.on('message', (message) => {
  const usersFromMessage = JSON.parse(message);
  userController.setUsers(usersFromMessage);
});

export const router = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    if (req.url?.startsWith('/api/users')) {
      const [_, basePath, route, id] = req.url.split('/');

      if (req.method === 'GET') {
        if (id) {
          userController.getUser(req, res, id);
        } else {
          userController.getUsers(req, res);
        }
        return;
      }

      if (req.method === 'POST' && !id) {
        await userController.post(req, res);
        return;
      }

      if (req.method === 'PUT' && id) {
        await userController.put(req, res, id);
        return;
      }

      if (req.method === 'DELETE' && id) {
        await userController.delete(req, res, id);
        return;
      }

      responseHandler(res, 404, { message: ErrorMessages.NOT_ROUTE });
    } else {
      responseHandler(res, 404, { message: ErrorMessages.NOT_ROUTE });
    }
  } catch {
    responseHandler(res, 500, { message: ErrorMessages.SOMETHING_WRONG });
  }
};
