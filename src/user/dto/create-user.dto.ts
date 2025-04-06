import { Roles } from "@prisma/client"

export class CreateUserDto {
    fullName:string
    email:string
    password:string
    image:string
    role:Roles
}
