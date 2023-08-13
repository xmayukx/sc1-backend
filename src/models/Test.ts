import mongoose from "mongoose";
import { Test } from "../types";

const testSchema = new mongoose.Schema<Test>({
  subject: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      content: {
        type: String,
        required: true,
      },
    },
  ],
  correctAns: {
    type: Number,
    required: true,
  }
});

export default mongoose.model<Test>("Test", testSchema);
