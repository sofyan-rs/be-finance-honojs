export interface UserDto {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  modifiedAt: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}
