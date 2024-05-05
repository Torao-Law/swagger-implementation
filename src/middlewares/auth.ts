import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default new class AuthMiddleware {
  Authentication(req: Request, res: Response, next: NextFunction) : Response {
    try {
      const authorizationHeader = req.headers.authorization;
      
      if(!authorizationHeader || !authorizationHeader.startsWith("Bearer")) return res.status(401).json({ message: "unauthorized because token is not valid !"});
      const token = authorizationHeader.split(" ")[1];

      try {

        const loginSession = jwt.verify(token, "sayaganteng");
        res.locals.loginSession = loginSession;

        next();
      } catch (error) {
        return res.status(401).json({ message: "unauthorized!! "});
      }
    } catch (error) {
      return res.status(500).json({ message: "error!" });
    };
  };
};