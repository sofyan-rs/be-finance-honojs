import { Context } from "hono";
import { CategoryService } from "../services/category.service";
import type { CreateCategoryDto, UpdateCategoryDto } from "../dto/category.dto";
import { errorResponse, successResponse } from "../utils/response-formatter";

export const createCategory = async (c: Context) => {
  try {
    const user = c.get("user");
    const body: CreateCategoryDto = await c.req.json();
    const payload: CreateCategoryDto = { ...body, userId: user.id };
    const category = await CategoryService.create(payload);
    return c.json(
      successResponse({
        message: "Category created successfully",
        data: category,
      })
    );
  } catch (err: any) {
    return c.json(errorResponse({ message: err.message }), err.status);
  }
};

export const getCategories = async (c: Context) => {
  try {
    const user = c.get("user");
    const categories = await CategoryService.getAllByUserId(user.id);
    return c.json(
      successResponse({
        message: "Categories fetched successfully",
        data: categories,
      })
    );
  } catch (err: any) {
    return c.json(errorResponse({ message: err.message }), err.status);
  }
};

export const getCategoryById = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const category = await CategoryService.getById(id);
    if (!category) {
      return c.json(errorResponse({ message: "Category not found" }), 404);
    }
    return c.json(
      successResponse({
        message: "Category fetched successfully",
        data: category,
      })
    );
  } catch (err: any) {
    return c.json(errorResponse({ message: err.message }), err.status);
  }
};

export const updateCategory = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const body: UpdateCategoryDto = await c.req.json();
    const category = await CategoryService.update(id, body);
    return c.json(
      successResponse({
        message: "Category updated successfully",
        data: category,
      })
    );
  } catch (err: any) {
    return c.json(errorResponse({ message: err.message }), err.status);
  }
};

export const deleteCategory = async (c: Context) => {
  try {
    const id = c.req.param("id");
    await CategoryService.delete(id);
    return c.json(
      successResponse({
        message: "Category deleted successfully",
      })
    );
  } catch (err: any) {
    return c.json(errorResponse({ message: err.message }), err.status);
  }
};
