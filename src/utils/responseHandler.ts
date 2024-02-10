import { ServerResponse } from "http";

export const responseHandler = (
  res: ServerResponse,
  statusCode: number,
  body: any
) => {
  res.writeHead(statusCode, "");
  res.write(JSON.stringify(body));
  res.end();
};
