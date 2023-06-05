import { Request,Response,NextFunction } from "express";

const errHandler = (err:Error,req:Request,res:Response, next:NextFunction) => {
    const status = res.statusCode ? res.statusCode : 500;
    res.json({
        message: err.message
    })
}
export default errHandler;