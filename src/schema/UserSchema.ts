import { number, object, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - firstName
 *        - lastName
 *        - age
 *      properties:
 *        firstName:
 *          type: string
 *          default: Putri
 *        lastName:
 *          type: string
 *          default: Maharani
 *        age:
 *          type: number
 *          default: 0
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        age:
 *          type: string
 *        _id:
 *          type: number
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: "Firstname is required",
    }),
    lastName: string({
      required_error: "Lastname is required",
    }),
    age: number({
      required_error: "age is required",
    })
  }),
});

