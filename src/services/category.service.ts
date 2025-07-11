import { CategoryRepository } from "../repositories/category.repository";
import type {
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryDto,
} from "../dto/category.dto";
import { toCategoryDto } from "../mappers/category.mapper";
import { HttpError } from "../errors/http-error";

export class CategoryService {
  static async create(data: CreateCategoryDto) {
    try {
      const category = await CategoryRepository.create(data);
      return toCategoryDto(category);
    } catch (error: unknown) {
      throw new HttpError(
        error instanceof Error ? error.message : "Failed to create category",
        500,
      );
    }
  }

  static async getById(id: string) {
    try {
      const category = await CategoryRepository.findById(id);
      return category ? toCategoryDto(category) : null;
    } catch (error: unknown) {
      throw new HttpError(
        error instanceof Error ? error.message : "Failed to get category",
        500,
      );
    }
  }

  static async update(id: string, data: UpdateCategoryDto) {
    try {
      const category = await CategoryRepository.update(id, data);
      return toCategoryDto(category);
    } catch (error: unknown) {
      throw new HttpError(
        error instanceof Error ? error.message : "Failed to update category",
        500,
      );
    }
  }

  static async delete(id: string) {
    try {
      await CategoryRepository.delete(id);
    } catch (error: unknown) {
      throw new HttpError(
        error instanceof Error ? error.message : "Failed to delete category",
        500,
      );
    }
  }

  static async getAllByUserId(userId: string) {
    try {
      const categories = await CategoryRepository.findByUserId(userId);
      return categories.map(toCategoryDto);
    } catch (error: unknown) {
      throw new HttpError(
        error instanceof Error ? error.message : "Failed to get categories",
        500,
      );
    }
  }
}
