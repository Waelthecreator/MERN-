import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import userModel from "../models/User";
import { Request,Response,NextFunction } from "express";

interface JwtPayload {
    id: string
  }
const authen = asyncHandler(async (req:Request, res:Response, next:NextFunction) => {
    const token = req.cookies.authToken;
    if(token !== undefined){
        let decode = jwt.verify(token, process.env.JWT_SIGN!)  as JwtPayload;
        let s = decode.id;
        req.body["user"] = await userModel.findOne({Username: s}).select("-Password");
        next();
    }
    else{
        res.statusCode = 400;
        res.json({mes1: "not available"});
    }
});
export default authen;