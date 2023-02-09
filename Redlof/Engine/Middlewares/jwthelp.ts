import { Response, NextFunction, Request } from "express";
const jwt = require("jsonwebToken");
// const User = require("./models/user");

const redis = require("redis");

const client = redis.createClient({
  host: "localhost",
  port: "6739",
});
client.connect();

module.exports.extractJwtToken = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const headerToken = req.headers["authorization"];

  if (headerToken) {
    let decoded = jwt.verify(headerToken, "secret");
    if (decoded) {
      client
        .get(decoded.id + "")
        .then((token: any) => {
          req.user = decoded;
          console.log(req.user);
          next();
        })
        .catch((err: any) => {
          return res
            .status(400)
            .json({ err: err, message: "Token is not there" });
        });
    } else {
      return res.status(400).json("Token is invalid");
    }
  } else {
    return res.status(400).json("Token is not found in header");
  }
};
