import express from "express";
import { Signup, Login, viewPersonals, changeFavorite, viewFavorites, Logout } from "../controllers/UsersController";
import authen from "../middleware/auth";
import { updateLikes } from "../controllers/guidesController";
const UserRouter = express.Router();

UserRouter.post('/Signup', Signup); 
//access: public
// requires a body with the payload Username:string, Password:string, and Name:string
UserRouter.post('/Login', Login); 
//access: public
//requires a body with the payload Username:string and Password:string
UserRouter.get('/Guides', authen, viewPersonals);
//access:private 
UserRouter.get('/logout', Logout);
//access: public
UserRouter.put('/Guides', authen, changeFavorite, updateLikes); 
////access: private
//requires a param with the id of the guide to change favorite status of,
//and a inc:boolean in the body where true means add to favorites and false means remove.
UserRouter.get('/favorites',authen,viewFavorites); 
//access:private

export default UserRouter;