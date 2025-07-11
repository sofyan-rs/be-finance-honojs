import type { User } from "@prisma/client";
import type { UserDto } from "../dto/user.dto";

export function toUserDto(user: User): UserDto {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt.toISOString(),
    modifiedAt: user.modifiedAt.toISOString(),
  };
}
