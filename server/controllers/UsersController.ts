import { Request, Response, NextFunction } from 'express';
import asyncHandler from "express-async-handler";
import userModel from '../models/User';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import guidesModel from '../models/Guides';
const geneJWT = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SIGN!, { expiresIn: "1h" });
}
const Signup = asyncHandler(async (req: Request, res: Response) => {
    if (req.body.Username === "" || req.body.Password === "" || req.body.Name === "") {
        res.statusCode = 400;
        res.json({ Message: "missing parameter" });
    }
    else if (await userModel.exists({ Username: req.body.Username })) {
        res.statusCode = 400;
        res.json({ Message: "Username is already in use" });
    }
    else {
        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(req.body.Password, salt);
        const newUser = new userModel({
            Username: req.body.Username,
            Password: pass,
            Name: req.body.Name,
            Favorites: [],
            Personal: []
        })
        await newUser.save();
        res.statusCode = 201;
        res.cookie('authToken', geneJWT(newUser.Username!), {
            httpOnly: true,
            secure: false,
            sameSite: false
        });
        res.json({
            Mesaage: "New user created"
        });

    }
});
const Login = asyncHandler(async (req: Request, res: Response) => {
    if (req.body.Username == "" || req.body.Password == "") {
        res.statusCode = 400;
        res.json({ Message: "Missing username or password" })
    }
    else if (!(await userModel.exists({ Username: req.body.Username }))) {
        res.statusCode = 404;
        res.json({ Message: "User does not exist" })
    }
    else {
        const user1 = await userModel.findOne({ Username: req.body.Username })
        const hashedpass = user1?.Password!;
        if (await bcrypt.compare(req.body.Password, hashedpass)) {
            res.statusCode = 200;
            res.cookie('authToken', geneJWT(user1?.Username!), {
                httpOnly: true
            });
            res.json({
                Message: "Authenticated", Name: user1?.Name
            });
        }
        else {
            res.statusCode = 400;
            res.json({ Message: "Invalid Credentials" });
        }
    }
});
const Logout = asyncHandler(async (req: Request, res: Response) => {
    res.clearCookie('authToken');
    res.status(200).json({ Message: "Logged out successfully" });
})

const viewPersonals = asyncHandler(async (req: Request, res: Response) => {
    let personalguides = req.body.user.Personal;
    if (personalguides.size === 0) {
        res.statusCode = 204;
        res.json({ Message: "No personal guides to view" })
    }
    else {
        const guides = await guidesModel.find({ _id: { $in: personalguides } }).select('_id Name');
        res.statusCode = 200;
        res.json({ guides });
    }

});
const viewFavorites = asyncHandler(async (req: Request, res: Response) => {
    const Favguides = req.body.user.Favorites;
    if (Favguides.size === 0) {
        res.statusCode = 204;
        res.json({ Message: "No personal guides to view" })
    }
    else {
        const guides = await guidesModel.find({ _id: { $in: Favguides }, Access: true });
        res.statusCode = 200;
        res.json({ guides });
    }

});
const changeFavorite = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const Favguides = req.body.user.Favorites;
    const guide = await guidesModel.findOne({ _id: req.params.id });
    if (guide) {
        if (req.body.inc) {
            Favguides.push(guide._id);
            req.body.user.Favorites = Favguides;
            await req.body.user.save();
            next();
        }
        else {
            const index = Favguides.indexOf();
            Favguides.splice(index);
            req.body.user.Favorites = Favguides;
            await req.body.user.save();
            next();
        }
    }
    else {
        res.statusCode = 404;
        res.json({ Message: "guide not found" });
    }
});
const MainPers = asyncHandler(async (req: Request, res: Response) => {
    const personalGuides = req.body.user.Personal;
    const guides = await guidesModel.find({ _id: { $in: personalGuides } }).sort({ createdAt: -1 }).limit(4).select('_id title');
    res.statusCode = 200;
    res.json({ guides });
});
export {
    Signup,
    Login,
    Logout,
    viewPersonals,
    viewFavorites,
    changeFavorite,
    MainPers
}