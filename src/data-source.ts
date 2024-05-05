import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Products } from "./entity/Product"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "SwaggerTest",
    synchronize: true,
    logging: false,
    entities: [User, Products],
    migrations: [],
    subscribers: [],
})
