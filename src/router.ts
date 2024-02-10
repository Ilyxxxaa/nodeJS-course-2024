import { ServerResponse, IncomingMessage } from 'http';
import userController from './controllers/userController';
import { responseHandler } from './utils/responseHandler';
import { ErrorMessages } from './constants';

export const router = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.url?.startsWith('/api')) {
    const [_, basePath, route, id] = req.url.split('/');

    console.log(basePath, route, id);

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
    }

    if (req.method === 'POST') {
      await userController.post(req, res);
    }
  }
};
//   if (req.method === "GET") {
//     console.log(req.url);
//     // res.statusCode = 201;
//     // res.setHeader("IlyaName", "Kotsur");
//     // res.write(
//     //   JSON.stringify({
//     //     name: "Ilya",
//     //   })
//     // );
//     // res.end();
//   }
//   if (req.method === "POST") {
//     res.write(
//       JSON.stringify({
//         name: "IlyaPOST",
//       })
//     );
//     res.end();
//   }
