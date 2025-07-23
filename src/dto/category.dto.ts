import { TransactionType } from "@prisma/client";

export interface CategoryDto {
  id: string;
  name: string;
  type: TransactionType;
  icon: string;
  color: string;
  userId: string | null;
  createdAt: string;
  modifiedAt: string;
}

export interface CreateCategoryDto {
  name: string;
  type: TransactionType;
  icon: string;
  color: string;
  userId?: string;
}

export interface UpdateCategoryDto {
  name?: string;
  type?: TransactionType;
  icon?: string;
  color?: string;
}
