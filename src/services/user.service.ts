import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository";
import type {
  UserDto,
  UpdateUserDto,
  ChangePasswordDto,
} from "../dto/user.dto";
import { toUserDto } from "../mappers/user.mapper";
import { HttpError } from "../errors/http-error";

const JWT_SECRET = process.env.JWT_SECRET || "default";

export class UserService {
  static async register(name: string, email: string, plainPassword: string) {
    try {
      const exists = await UserRepository.findByEmail(email);
      if (exists) throw new HttpError("Email already used", 409);

      const hashed = await bcrypt.hash(plainPassword, 10);
      const user = await UserRepository.create({
        name,
        email,
        password: hashed,
      });

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return { token, user: toUserDto(user) };
    } catch (error: any) {
      throw new HttpError(error?.message || "Failed to register user", 500);
    }
  }

  static async login(email: string, plainPassword: string) {
    try {
      const user = await UserRepository.findByEmail(email);
      if (!user) throw new HttpError("Invalid credentials", 401);

      const valid = await bcrypt.compare(plainPassword, user.password);
      if (!valid) throw new HttpError("Invalid credentials", 401);

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return { token, user: toUserDto(user) };
    } catch (error: any) {
      throw new HttpError(error?.message || "Failed to login", 500);
    }
  }

  static async getById(id: string): Promise<UserDto | null> {
    try {
      const user = await UserRepository.findById(id);
      return user ? toUserDto(user) : null;
    } catch (error: any) {
      throw new HttpError(error?.message || "Failed to get user", 500);
    }
  }

  static async updateProfile(id: string, data: UpdateUserDto) {
    try {
      const user = await UserRepository.findById(id);
      if (!user) throw new HttpError("User not found", 404);

      const updated = await UserRepository.update(id, data);
      return toUserDto(updated);
    } catch (error: any) {
      throw new HttpError(error?.message || "Failed to update user", 500);
    }
  }

  static async changePassword(id: string, dto: ChangePasswordDto) {
    try {
      const user = await UserRepository.findById(id);
      if (!user) throw new HttpError("User not found", 404);

      const valid = await bcrypt.compare(dto.currentPassword, user.password);
      if (!valid) throw new HttpError("Current password is incorrect", 400);

      const hashed = await bcrypt.hash(dto.newPassword, 10);
      await UserRepository.update(id, { password: hashed });

      return { message: "Password updated successfully" };
    } catch (error: any) {
      throw new HttpError(error?.message || "Failed to change password", 500);
    }
  }
}
