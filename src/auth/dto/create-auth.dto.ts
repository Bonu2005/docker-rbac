import { Roles } from "@prisma/client"

export class CreateAuthDto {
    fullName: string
    email: string
    password: string
    image: string
    role: Roles
}
export class LoginAuthDto{
    email: string
    password: string
}