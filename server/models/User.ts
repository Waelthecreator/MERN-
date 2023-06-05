import mongoose from "mongoose";

const schema = mongoose.Schema;
const user = new schema({
    Username:
    {
        type: String,
        unique: true,
        required: true
    },
    Password:
    {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Favorites: {
        type: [String],
        required: true
    },
    Personal: {
        type: [String],
        required: true
    }
}, { timestamps: true });

const userModel = mongoose.model("User", user);

export default userModel; 