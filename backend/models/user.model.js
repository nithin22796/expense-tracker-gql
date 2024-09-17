import Mongoose from "mongoose";

const userSchema = new Mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    gender: {
        type: String,
        enum: ["male", "female", "others"],
    }
}, {timestamps: true});

const User = Mongoose.model("User", userSchema);
export default User;