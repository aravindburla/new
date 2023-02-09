import { Response, NextFunction } from "express"
import  jwt from "jsonwebtoken";

module.exports.sendResponse = (res: Response, statusCode: number, message:string, data:any)=>{
    return res.status(statusCode).json({
        message,
        data
    })
}

