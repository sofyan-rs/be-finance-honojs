import { UserSettingRepository } from "../repositories/setting.repository";
import type {
  CreateUserSettingDto,
  UpdateUserSettingDto,
} from "../dto/setting.dto";
import { toUserSettingDto } from "../mappers/setting.mapper";
import { HttpError } from "../errors/http-error";

export class UserSettingService {
  static async create(data: CreateUserSettingDto) {
    try {
      const userSetting = await UserSettingRepository.create(data);
      return toUserSettingDto(userSetting);
    } catch (error: unknown) {
      throw new HttpError(
        error instanceof Error
          ? error.message
          : "Failed to create user setting",
        500
      );
    }
  }

  static async getById(id: string) {
    try {
      const userSetting = await UserSettingRepository.findById(id);
      return userSetting ? toUserSettingDto(userSetting) : null;
    } catch (error: unknown) {
      throw new HttpError(
        error instanceof Error ? error.message : "Failed to get user setting",
        500
      );
    }
  }

  static async getByUserId(userId: string) {
    try {
      const userSetting = await UserSettingRepository.findByUserId(userId);
      return userSetting ? toUserSettingDto(userSetting) : null;
    } catch (error: unknown) {
      throw new HttpError(
        error instanceof Error ? error.message : "Failed to get user setting",
        500
      );
    }
  }

  static async update(id: string, data: UpdateUserSettingDto) {
    try {
      const userSetting = await UserSettingRepository.update(id, data);
      return toUserSettingDto(userSetting);
    } catch (error: unknown) {
      throw new HttpError(
        error instanceof Error
          ? error.message
          : "Failed to update user setting",
        500
      );
    }
  }

  static async updateByUserId(userId: string, data: UpdateUserSettingDto) {
    try {
      const userSetting = await UserSettingRepository.updateByUserId(
        userId,
        data
      );
      return toUserSettingDto(userSetting);
    } catch (error: unknown) {
      throw new HttpError(
        error instanceof Error
          ? error.message
          : "Failed to update user setting",
        500
      );
    }
  }

  static async delete(id: string) {
    try {
      await UserSettingRepository.delete(id);
    } catch (error: unknown) {
      throw new HttpError(
        error instanceof Error
          ? error.message
          : "Failed to delete user setting",
        500
      );
    }
  }
}
