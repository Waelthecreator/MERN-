import express from "express";
import { makeGuide, deleteGuide, updateNotesAndCards, changeAccess, GetGuide, GetPrivGuide,GetEditingRights } from "../controllers/guidesController";
import authen from "../middleware/auth";
const GuideRouter = express.Router();
GuideRouter.post("", authen, makeGuide); //has a python test
//Access: private
// requires a Title:string in the body
GuideRouter.get("/:id", GetGuide, authen, GetPrivGuide);  //all possible outcomes have python test cases
//access: public/private
//requires a param with the id of the guide wanted.
GuideRouter.get('/edit/:id', authen, GetEditingRights); //has python test
//access: private
//requires a param with the id of the guide to get editing rights
GuideRouter.delete("/:id", authen, deleteGuide); 
//access: private
//requires a param with the id of the guide to delete
GuideRouter.put("/access/:id", authen, changeAccess); //has python test
//access: private
//requires a param with the id of the guide to change access to, 
//and a access:boolean in the body where true for public and false for private.
GuideRouter.put("/info/:id", authen, updateNotesAndCards); //has python test
//access: private
//requires a param with the id of the guide to change notes and cards to,
//and either a Cards:string[][] or a Notes:string in the request body.
export default GuideRouter;