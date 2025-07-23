import { Context } from "hono";
import { CategoryService } from "../services/category.service";
import type { CreateCategoryDto, UpdateCategoryDto } from "../dto/category.dto";

export const createCategory = async (c: Context) => {
  try {
    const user = c.get("user");
    const body: CreateCategoryDto = await c.req.json();
    const payload: CreateCategoryDto = { ...body, userId: user.id };
    const category = await CategoryService.create(payload);
    return c.json(category);
  } catch (err: unknown) {
    return c.json(
      { error: err instanceof Error ? err.message : String(err) },
      400
    );
  }
};

export const getCategories = async (c: Context) => {
  try {
    const user = c.get("user");
    const categories = await CategoryService.getAllByUserId(user.id);
    return c.json(categories);
  } catch (err: unknown) {
    return c.json(
      { error: err instanceof Error ? err.message : String(err) },
      400
    );
  }
};

export const getCategoryById = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const category = await CategoryService.getById(id);
    if (!category) {
      return c.json({ error: "Category not found" }, 404);
    }
    return c.json(category);
  } catch (err: unknown) {
    return c.json(
      { error: err instanceof Error ? err.message : String(err) },
      400
    );
  }
};

export const updateCategory = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const body: UpdateCategoryDto = await c.req.json();
    const category = await CategoryService.update(id, body);
    return c.json(category);
  } catch (err: unknown) {
    return c.json(
      { error: err instanceof Error ? err.message : String(err) },
      400
    );
  }
};

export const deleteCategory = async (c: Context) => {
  try {
    const id = c.req.param("id");
    await CategoryService.delete(id);
    return c.json({ message: "Category deleted successfully" });
  } catch (err: unknown) {
    return c.json(
      { error: err instanceof Error ? err.message : String(err) },
      400
    );
  }
};
