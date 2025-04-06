import { SetMetadata } from "@nestjs/common"
import { Roles } from "@prisma/client"

export const RolesKey = "role"
export const Role = (...roles :Roles[])=>SetMetadata(RolesKey,roles)