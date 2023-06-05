import express from "express";
import { makeGuide, deleteGuide, updateNotesAndCards, changeAccess, GetGuide, GetPrivGuide,GetEditingRights } from "../controllers/guidesController";
import authen from "../middleware/auth";
const GuideRouter = express.Router();

GuideRouter.post("", authen, makeGuide); 
//Access: private
// requires a Title:string in the body
GuideRouter.get("", GetGuide, authen, GetPrivGuide);
//access: public/private
//requires a param with the id of the guide wanted.
GuideRouter.get('/edit', authen, GetEditingRights);
//access: private
//requires a param with the id of the guide to get editing rights
GuideRouter.delete("", authen, deleteGuide); 
//access: private
//requires a param with the id of the guide to delete
GuideRouter.put("/access", authen, changeAccess);
//access: private
//requires a param with the id of the guide to change access to, 
//and a access:boolean in the body where true for public and false for private.
GuideRouter.put("/info", authen, updateNotesAndCards);
//access: private
//requires a param with the id of the guide to change notes and cards to,
//and either a Cards:string[][] or a Notes:string in the request body.
export default GuideRouter;