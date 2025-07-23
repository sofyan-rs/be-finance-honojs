export interface UserSettingDto {
  id: string;
  userId: string;
  currency: string;
  createdAt: string;
  modifiedAt: string;
}

export interface CreateUserSettingDto {
  userId: string;
  currency?: string;
}

export interface UpdateUserSettingDto {
  currency?: string;
}
