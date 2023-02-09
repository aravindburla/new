import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import Role from "../../../Engine/Models/role";
import User from "../../../Engine/Models/user";
import Category from "../../../Engine/Models/category";
import Todo from "../../../Engine/Models/todo";
import UserToRole from "../../../Engine/Models/usertorole";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const redis = require("redis");
const client = redis.createClient({
  host: "localhost",
  port: "6739",
});
client.connect();

export const fetchUserCatTasks = async (req: Request, res: Response) => {
  try {
    let Tasks = await User.findAll({
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Category,
          required: true,
          // right: true,
          include: [{ model: Todo, required: true }],
        },
      ],
    });
    return res.status(201).json(Tasks);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    console.log("ffef");
    let password = req.body.password;
    let isUserAdmin;
    if (req.body.isAdmin) {
      isUserAdmin = true;
    } else {
      isUserAdmin = false;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user: any = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    if (isUserAdmin) {
      const getAdminId: any = await Role.findOne({
        where: {
          name: "Admin",
        },
      });
      let user_role = await UserToRole.create({
        user_id: user.id,
        role_id: getAdminId.id,
      });
    } else {
      const getUserId: any = await Role.findOne({
        where: {
          name: "User",
        },
      });
      let user_role = await UserToRole.create({
        user_id: user.id,
        role_id: getUserId.id,
      });
    }

    res
      .status(201)
      .json({ message: "user is done with registered", data: user });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const login = async (req: Request, res: Response) => {
  console.log("dfef");

  const user: any = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (user) {
    const isMatched = await bcrypt.compare(req.body.password, user.password);
    if (isMatched) {
      const token = await jwt.sign(
        { id: user.id, isAdmin: user.isAdmin },
        "secret",
        {
          expiresIn: "1d",
        }
      );

      client.set(user.id + "", token);
      return res.json({
        access_token: token,
      });
    }
  }
  return res.status(400).json({ message: "not authorised" });
};

export const addRoles = async (req: Request, res: Response) => {
  try {
    let roles = await Role.create({ name: req.body.name });
    return res.status(201).json(roles);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const googleAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  try {
    const user: any = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      const token = await jwt.sign(
        { id: user.id, isAdmin: user.isAdmin },
        "secret",
        {
          expiresIn: "1d",
        }
      );
      client.set(user.id + "", token);
      return res.status(200).json({ access_token: token });
    } else {
      const newUser: any = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: null,
      });
      const getUserId: any = await Role.findOne({
        where: {
          name: "User",
        },
      });
      let user_role = await UserToRole.create({
        user_id: newUser.id,
        role_id: getUserId.id,
      });
      const token = jwt.sign({ id: newUser.id }, "secret", {
        expiresIn: "1d",
      });
      client.set(newUser.id + "", token);
      return res.status(201).json({ access_token: token });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};


export const fetchRoles = async (req: any, res: Response) => {
    try {
      const user_roles: any = await User.findByPk(req.user.id, {
        include: [{ model: Role, required: true }],
      });
      console.log(user_roles.roles[0].name);
      return res.status(201).json(user_roles);
    } catch (error) {
      return res.status(500).json(error);
    }
  };
  