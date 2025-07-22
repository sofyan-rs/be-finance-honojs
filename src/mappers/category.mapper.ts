import type { CategoryDto } from "../dto/category.dto";
import type { Category } from "@prisma/client";

export function toCategoryDto(category: Category): CategoryDto {
  return {
    id: category.id,
    name: category.name,
    type: category.type,
    icon: category.icon,
    userId: category.userId,
    createdAt: category.createdAt.toISOString(),
    modifiedAt: category.modifiedAt.toISOString(),
  };
}
