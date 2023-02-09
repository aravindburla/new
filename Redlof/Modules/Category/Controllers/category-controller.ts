import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import Role from "../../../Engine/Models/role";
import User from "../../../Engine/Models/user";
import Category from "../../../Engine/Models/category";
import Todo from "../../../Engine/Models/todo";
import UserToRole from "../../../Engine/Models/usertorole";

export const fetchUserCategory = async (req: Request, res: Response) => {
  try {
    let categories = await User.findAll({
      include: [
        {
          model: Category,
        },
      ],
    });
    return res.status(201).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const fetchCategories = async (req: any, res: Response) => {
  console.log(req.user);
  // let id = req.param

  try {
    let categories = await Category.findAll({
      where: {
        [Op.or]: [{ type: "Admin" }, { user_id: req.user.id }],
      },
    });

    return res.status(200).json({
      categories,
    });
  } catch (err) {
    console.log("Error in fetching categories", err);
    return res.status(500).json({
      message: "server error",
    });
  }
};

export const createCategory = async (req: any, res: Response) => {
  console.log(req.user);
  try {
    console.log("createCategory", req.body);
    console.log(req.user);
    const user_roles: any = await User.findByPk(req.user.id, {
      include: [{ model: Role, required: true }],
    });

    let category = await Category.create({
      name: req.body.name,
      type: user_roles.roles[0].name == "Admin" ? "Admin" : "User",
      user_id: req.user.id,
    });
    return res.status(200).json({
      message: "New category created",
      data: category,
    });
  } catch (err) {
    console.log("Error in creating category", err);
    return res.status(500).json({
      message: "server error",
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({
      message: "Category is updated",
      data: category,
    });
  } catch (error) {
    console.log("Error in updating the Category", error);
    return res.status(500).json({
      message: "server error",
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    let category = await Category.findByPk(req.params.id);
    if (Todo)
      await Category.destroy({
        where: {
          id: req.params.id,
        },
      });

    return res.status(200).json({
      message: "category is deleted",
      data: category,
    });
  } catch (error) {
    console.log("Error in deleting a category", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
