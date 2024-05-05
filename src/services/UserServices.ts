import { DataSource, Repository } from "typeorm"
import { User } from "../entity/User"
import { AppDataSource } from "../data-source"
import { createUserSchema } from "../schema/UserSchema"

export default new class UserServices {
  private readonly UserRepository: Repository<User> = AppDataSource.getRepository(User)

  async findUser() : Promise<any> {
    try {
      const users = await this.UserRepository.createQueryBuilder("user").getMany()

      return users
    } catch (error) {
      throw new Error(error)
    }
  }

  async GetUser(username: string) : Promise<any> {
    try {
      const users = this.UserRepository.createQueryBuilder("user").select(['user.fullName', 'user.username', 'user.age']).where("user.username = :username", { username: username }).getOne()

      return users
    } catch (error) {
      throw new Error(error)
    }
  }

  async register(reqBody: any) : Promise<any> {
    try {      
      const data = this.UserRepository.create({
        fullName: reqBody.fullName,
        username: reqBody.username,
        password: reqBody.hashPassword,
        age: reqBody.age
      })

      await this.UserRepository.createQueryBuilder().insert().into(User).values(data).execute()

      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  async login(username: any) : Promise<any> {
    try {
      const users = this.UserRepository.createQueryBuilder("user").where("user.username = :username", { username: username }).getOne()

      return users
    } catch (error) {
      throw new Error(error)
    }
  }
}