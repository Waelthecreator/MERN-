import express from 'express';
import UserRouter from './routes/UsersRoutes'
import GuideRouter from './routes/GuideRoutes';
import errHandler from "./middleware/errHandler"
import mongoose from "mongoose";
import { config } from "dotenv";
import authen from './middleware/auth';
import cors from "cors";
import cookieParser from "cookie-parser";
import { AllGuides, PopularGuides } from './controllers/guidesController';
import { MainPers } from './controllers/UsersController';
import { Request,Response,NextFunction } from 'express';
config();

const app = express();
let port = 5000;
const db = mongoose.connect(process.env.MONGO_URL!).then(() => {
    app.listen(port);
    console.log("app listening");
})
app.use(cors({ origin: "http://localhost:5173"}));
app.use(cookieParser());
app.use(express.json());
app.use(errHandler);
app.use('/Guides', GuideRouter);
app.use('/Users', UserRouter);
app.get("/all", AllGuides);
app.get('/', PopularGuides); 
//access: public
app.get("/pers",authen, MainPers);
//access:private