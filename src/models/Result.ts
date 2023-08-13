import mongoose from "mongoose";
import { Result } from "../types";


const resultSchema= new mongoose.Schema<Result>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        },
    correctAns: {
        type: [Number],
        required: true,
    },
    checkedNum: {
        type: Number,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    fullScore: {
        type: Number,
        required: true,
    }
});

export default mongoose.model<Result>("Result", resultSchema);