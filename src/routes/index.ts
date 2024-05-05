import express, { Router } from "express"
import UserControllers from "../controllers/UserControllers"
import AuthMiddleware from "../middlewares/auth"

const Route = express.Router()


/**
 * @openapi
 * /api/v1/users:
 *  get:
 *     tags:
 *     - Users
 *     description: Responds if the app is up and running
 *     summary: Get all threads posting.
 *     responses:
 *       200:
 *         description: Success 
 *         content: 
 *          application/json:  
 *            schema:  
 *              $ref:  '#/components/schemas/CreateUserResponse'
 */
Route.get("/users", UserControllers.find)

/**
 * @openapi
 * '/api/v1/auth/register':
 *  post:
 *     tags:
 *     - Users
 *     summary: Create a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
Route.post("/auth/register", UserControllers.register
)

Route.post("/auth/login", UserControllers.login)

export default Route
