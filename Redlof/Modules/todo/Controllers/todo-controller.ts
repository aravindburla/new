import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import Role from "../../../Engine/Models/role";
import User from "../../../Engine/Models/user";
import Category from "../../../Engine/Models/category";
import Todo from "../../../Engine/Models/todo";
import UserToRole from "../../../Engine/Models/usertorole";

export const fetchTodos = async (req: Request, res: Response) => {
  let id = req.params.id;
  try {
    let Todos = await Todo.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Category,
        },
      ],
    });

    return res.status(200).json({
      message: "All Todos",
      data: Todos,
    });
  } catch (err) {
    console.log("Error in fetching Todos", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const fetchTodoById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    let Todos = await Todo.findByPk(id, {
      include: [{ model: Category }, { model: User }],
    });

    return res.status(200).json({
      message: "All Todos",
      data: Todos,
    });
  } catch (err) {
    console.log("Error in fetching Todos", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const createTodo = async (req: any, res: Response) => {
  try {
    console.log("body", req.body);

    let categories = await Category.findAll({
      where: {
        [Op.or]: [{ type: "Admin" }, { user_id: req.user.id }],
      },
    });

    let catArray: any = [];

    categories.map((catId: any) => {
      if (catId.user_id == req.user.id) {
        catArray.push(catId.id);
      }
      if (catId.type == "Admin") {
        catArray.push(catId.id);
      }
    });

    console.log(catArray);
    if (!catArray.includes(req.body.category_id)) {
      return res.status(200).json({
        message: "you can select only admin's and your own categories",
      });
    }

    let Todois = await Todo.create({
      title: req.body.title,
      description: req.body.description,
      category_id: req.body.category_id,
      user_id: req.user.id,
    });

    return res.status(200).json({
      message: "New Todo created",
      data: Todois,
    });
  } catch (err) {
    console.log("Error in creating a todo", err);
    return res.status(500).json({
      message: "server error",
    });
  }
};

export const updateTodo = async (req: any, res: Response) => {
  try {
    const todo = await Todo.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({
      message: "Todo is updated",
      data: todo,
    });
  } catch (error) {
    console.log("Error in updating the todo", error);
    return res.status(500).json({
      message: "server error",
    });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    let Todois = await Todo.findByPk(req.params.id);
    if (Todo)
      await Todo.destroy({
        where: {
          id: req.params.id,
        },
      });

    return res.status(200).json({
      message: "Todo is deleted",
      data: Todois,
    });
  } catch (error) {
    console.log("Error in delete a todo", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};



