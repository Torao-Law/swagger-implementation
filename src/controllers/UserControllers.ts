import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserServices from "../services/UserServices";
import Jwt from "jsonwebtoken";

export default new class UserControllers {
  async find(req: Request, res: Response) : Promise<Response> {
    try {
      const findUsers = await UserServices.findUser()

      return res.status(200).json({
        message: "success",
        data: findUsers
      })
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async register(req: Request, res: Response) : Promise<Response> {
    try {
      const { fullName, username, password, age } = req.body;

      const getUser = await UserServices.GetUser(username)
      if(getUser) return res.status(409).json({ message: "Conflict, username has already registered !"})
      
      const hashPassword = await bcrypt.hash(password, 10)
      
      const data = {
        fullName,
        username,
        hashPassword,
        age
      }

      const createUser = await UserServices.register(data)

      return res.status(201).json({
        message: "success",
        data: createUser
      })
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async login(req: Request, res: Response) : Promise<Response> {
    try {
      const { username, password } = req.body;
      const user = await UserServices.login(username)

      if(!user) return res.status(404).json({ message: "Email not registered !" });

      const comparePassword = await bcrypt.compare(password, user.password) 
      if(!comparePassword) return res.status(404).json({ message: "Password is wrong !" });

      const data = {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
      }

      const token =  Jwt.sign({ data }, "sudahmakandulusana", { expiresIn: "1h" });

      return res.status(200).json({
        message: "success",
        data: {
          token: token,
          user: data
        }
      })
    } catch (error) {
      return res.status(500).json(error)
    }
  }
}