import { ServerResponse, IncomingMessage } from 'http';
import userController from './controllers/userController';
import { responseHandler } from './utils/responseHandler';
import { ErrorMessages } from './constants';

export const router = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.url?.startsWith('/api')) {
    const [_, basePath, route, id] = req.url.split('/');

    if (req.method === 'GET') {
      switch (route) {
        case 'users':
          if (id) {
            userController.getUser(req, res, id);
          } else {
            userController.getUsers(req, res);
          }
          break;
        default:
          responseHandler(res, 404, ErrorMessages.NOT_ROUTE);
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

    responseHandler(res, 404, ErrorMessages.NOT_ROUTE);
  } else {
    responseHandler(res, 404, ErrorMessages.NOT_ROUTE);
  }
};
