import { ServerResponse, IncomingMessage } from 'http';

import { getDataFormPOSTRequest } from '../utils/getDataFromPOSTRequest';
import { User } from '../types';
import { responseHandler } from '../utils/responseHandler';
import { ErrorMessages, IDRegExp } from '../constants';
import { randomUUID } from 'crypto';

class UserController {
  users: User[];

  constructor() {
    this.users = [];
  }

  getUsers = (req: IncomingMessage, res: ServerResponse) => {
    responseHandler(res, 200, this.users);
  };

  getUser = (req: IncomingMessage, res: ServerResponse, id: string) => {
    if (!id.match(IDRegExp)) {
      responseHandler(res, 400, { message: ErrorMessages.INVALID_ID });
    } else {
      const user = this.users.find((item) => item.id === id);
      if (!user) {
        responseHandler(res, 404, { message: ErrorMessages.NOT_USER });
      } else {
        responseHandler(res, 200, user);
      }
    }
    res.end();
  };

  post = async (req: IncomingMessage, res: ServerResponse) => {
    try {
      const body = await getDataFormPOSTRequest(req);
      const { name, age, hobbies } = body;

      if (!name || !age || !hobbies) {
        responseHandler(res, 400, { message: ErrorMessages.INVALID_BODY });
      } else if (!Number.isInteger(age) || typeof name !== 'string' || !Array.isArray(hobbies)) {
        responseHandler(res, 400, { message: ErrorMessages.INVALID_BODY_TYPES });
      } else {
        const newUser = {
          id: randomUUID(),
          name,
          age,
          hobbies,
        };
        this.users.push(newUser);
        responseHandler(res, 201, JSON.stringify(newUser));
      }
    } catch (err) {
      console.log('error', err);
    }
  };

  put = async (req: IncomingMessage, res: ServerResponse, id: string) => {
    try {
      if (!id.match(IDRegExp)) {
        responseHandler(res, 400, { message: ErrorMessages.INVALID_ID });
      } else {
        const user = this.users.find((item) => item.id === id);
        if (!user) {
          responseHandler(res, 404, { message: ErrorMessages.NOT_USER });
        } else {
          const body = await getDataFormPOSTRequest(req);
          const { name, age, hobbies } = body;
          if (!name || !age || !hobbies) {
            responseHandler(res, 400, { message: ErrorMessages.INVALID_BODY });
          } else if (!Number.isInteger(age) || typeof name !== 'string' || !Array.isArray(hobbies)) {
            responseHandler(res, 400, { message: ErrorMessages.INVALID_BODY_TYPES });
          } else {
            this.users = this.users.map((user) => {
              if (user.id === id) {
                return {
                  ...user,
                  name,
                  age,
                  hobbies,
                };
              }
              return user;
            });
            responseHandler(res, 201, body);
          }
        }
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  delete = async (req: IncomingMessage, res: ServerResponse, id: string) => {
    try {
      if (!id.match(IDRegExp)) {
        responseHandler(res, 400, { message: ErrorMessages.INVALID_ID });
      } else {
        const userIndex = this.users.findIndex((item) => item.id === id);
        if (userIndex === -1) {
          responseHandler(res, 404, { message: ErrorMessages.NOT_USER });
        } else {
          const body = await getDataFormPOSTRequest(req);
          this.users.splice(userIndex, 1);
          responseHandler(res, 204, body);
        }
      }
    } catch (err) {
      console.log('err', err);
    }
  };
}

export default new UserController();
