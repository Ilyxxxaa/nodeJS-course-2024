import { ServerResponse, IncomingMessage } from 'http';
import { users } from '../users';
import { getDataFormPOSTRequest } from '../utils/getDataFromPOSTRequest';
import { User } from '../types';
import { responseHandler } from '../utils/responseHandler';
import { ErrorMessages } from '../constants';

class UserController {
  getUsers = (req: IncomingMessage, res: ServerResponse) => {
    res.write(JSON.stringify(users));
    res.end();
  };

  getUser = (req: IncomingMessage, res: ServerResponse, id: string) => {
    res.write(JSON.stringify(id));
    res.end();
  };

  post = async (req: IncomingMessage, res: ServerResponse) => {
    try {
      const body = await getDataFormPOSTRequest(req);
      const { name, age } = body;

      if (!name || !age) {
        responseHandler(res, 400, JSON.stringify({ message: ErrorMessages.INVALID_BODY }));
      } else if (!Number.isInteger(age) || typeof name !== 'string') {
        responseHandler(res, 400, JSON.stringify({ message: ErrorMessages.INVALID_BODY_TYPES }));
      } else {
        responseHandler(res, 201, JSON.stringify({ name, age }));
      }
    } catch (err) {
      console.log('error', err);
    }
  };
}

export default new UserController();
