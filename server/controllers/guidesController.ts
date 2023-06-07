import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import guidesModel from "../models/Guides";

const makeGuide = asyncHandler(async (req: Request, res: Response) => {
    if (req.body.Title == "") {
        res.statusCode = 400;
        res.json({ Message: "missing parameter" })
    }
    else {
        let author = req.body.user.Username;
        let title = req.body.Title;
        const newGuide = new guidesModel({
            Name: title,
            Author: author,
            Notes: " ",
            Cards: [],
            Access: false,
            Likes: "1"
        });
        await newGuide.save();
        let personal = req.body.user["Personal"];
        if (personal == undefined) {
            personal = [];
            personal.push(newGuide._id);
        }
        else {
            personal.push(newGuide._id);
        }

        req.body.user.Personal = personal;
        await req.body.user.save();
        res.statusCode = 201;
        res.json({ Message: `new guide saved to ${req.body.user.Username}` });
    }
});
const GetGuide = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const guide = await guidesModel.findOne({ _id: req.params.id}, { Name: 1, Author: 1, Notes: 1, Cards: 1, Access:1 });
    if(guide){
        if (guide.Access === true) {
            res.statusCode = 200;
            res.json({guide:guide});
        }
        else {
            next()
        }
    }
    else{
        res.statusCode = 404;
        res.json({mes1:"guide not found"});
    }
    
})
const GetPrivGuide = asyncHandler(async (req: Request, res: Response) => {
    let personal = req.body.user.Personal;
    if (personal.includes(req.params.id)) {
        const guide = await guidesModel.findOne({ _id: req.params.id }).select('Name Author Notes Cards Access');
        res.statusCode = 200;
        res.json({guide:guide});
    }
    else {
        res.statusCode = 403;
        res.json({ Message: "unathorized access" });

    }
});
const GetEditingRights = asyncHandler(async (req: Request, res: Response) => {
    let personal = req.body.user.Personal;
    if(personal.includes(req.params.id)){
        res.statusCode = 200;
        res.json({mes1: true})
    }
    else{
        res.statusCode = 403;
        res.json({mes1:false});
    }
});
const updateNotesAndCards = asyncHandler(async (req: Request, res: Response) => {
    let guide = await guidesModel.findOne({ _id: req.params.id });
    let personal = req.body.user.Personal;
    if (guide) {
        if (!personal.includes(guide?._id)) {
            res.statusCode = 403;
            res.json({ Message: "unathorized access" });
        }
        if (req.body.Notes) {
            guide.Notes = req.body.Notes;
        }
        if (req.body.Cards) {
            guide.Cards = req.body.Cards;
        }
        await guide.save();
        res.statusCode = 200;
        res.json({ Message: "cards updated" });
    }
    else {
        res.statusCode = 404;
        res.json({ Message: "guide not found" });
    }

});
const changeAccess = asyncHandler(async (req: Request, res: Response) => {
    let guide = await guidesModel.findOne({ _id: req.params.id });
    let personal = req.body.user.Personal;
    if (guide) {
        if (!personal.includes(guide._id)) {
            res.statusCode = 403;
            res.json({ Message: "unathorized access" });
        }
        guide.Access = req.body.access;
        await guide.save();
        res.statusCode = 200;
        res.json({ Message: "guide access updated" });
    }
    else {
        res.statusCode = 404;
        res.json({ Message: "guide not found" });
    }
})
const deleteGuide = asyncHandler(async (req: Request, res: Response) => {
    let guide = await guidesModel.findOne({ _id: req.params.id });
    let personal = req.body.user.Personal;
    if (guide) {
        if (!personal.includes(guide?._id)) {
            res.statusCode = 403;
            res.json({ Message: "unathorized access" });
        }
        await guidesModel.deleteOne({ _id: guide._id });
        res.statusCode = 200;
        res.json({ Message: "guide deleted" });
    }
    else {
        res.statusCode = 404;
        res.json({ Message: "guide not found" });
    }
})
const updateLikes = asyncHandler(async (req: Request, res: Response) => {
    let guide = await guidesModel.findOne({ _id: req.params.id });
    if (guide) {
        let likes = parseInt(guide.Likes);
        if (req.body.inc) {
            likes++;
            guide.Likes = `${likes}`;
            await guide.save();
            res.statusCode = 200;
            res.json({ Message: "liked" });
        } else {
            likes--;
            guide.Likes = `${likes}`;
            await guide.save();
            res.statusCode = 200;
            res.json({ Message: "unliked" });
        }
    }
    else {
        res.statusCode = 404;
        res.json({ Message: "guide not found" });
    }
})
const PopularGuides = asyncHandler(async (req: Request, res: Response) => {
    const top4 = await guidesModel.find({ Access: true }).sort({ Likes: -1 }).limit(4).select('_id Name');
    res.statusCode = 200;
    res.json({guides:top4});
});
const AllGuides = asyncHandler(async (req: Request, res: Response) => {
    const all = await guidesModel.find({ Access: true }).sort({ Likes: -1 }).select('_id Name').lean();
    res.statusCode = 200;
    res.json({ guides:all });
});
export {
    makeGuide, deleteGuide, updateNotesAndCards, changeAccess, GetGuide, GetPrivGuide, PopularGuides, updateLikes, AllGuides,GetEditingRights
}