import type { UserSetting } from "@prisma/client";
import type { UserSettingDto } from "../dto/setting.dto";

export function toUserSettingDto(userSetting: UserSetting): UserSettingDto {
  return {
    id: userSetting.id,
    userId: userSetting.userId,
    currency: userSetting.currency,
    createdAt: userSetting.createdAt.toISOString(),
    modifiedAt: userSetting.modifiedAt.toISOString(),
  };
}
