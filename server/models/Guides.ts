import mongoose from "mongoose";
const schema = mongoose.Schema;
const guides = new schema({
    Name: {
        type: String,
        required: true
    },
    Author: {
        type: String,
        required: true
    },
    Notes: {
        type:String,
        required: true,
    },
    Cards: {
        type: [[String]],
        required: true
    },
    Access: {
        type: Boolean,
        required: true
    },
    Likes: {
        type: String,
        required: true

    }
}, { timestamps: true });
const guidesModel = mongoose.model("Guide", guides);

export default guidesModel;