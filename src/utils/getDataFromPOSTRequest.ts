import { IncomingMessage } from "http";
import { User } from "../types";

export const getDataFormPOSTRequest = (req: IncomingMessage): Promise<User> => {
  return new Promise((resolve) => {
    req.setEncoding("utf-8");
    let chunks: string = "";

    req.on("data", (chunk) => {
      console.log("chunk", chunk);
      chunks += chunk;
    });

    req.on("end", () => {
      resolve(JSON.parse(chunks));
    });

    req.on("error", () => {
      console.log("error happend");
      throw new Error();
    });
  });
  //   req.setEncoding("utf-8");
};
