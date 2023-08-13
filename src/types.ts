import mongoose, { Document, ObjectId } from "mongoose";

export enum UserRole {
  Student = "student",
  Teacher = "teacher",
  Admin = "admin",
}

export interface User extends Document {
  name: string;
  email: string;
  role: UserRole;
  picture: string;
  updated_at: string;
  email_verified: boolean;
}

export interface Test extends Document {
  subject: string;
  question: string;
  options: [Answers];
  correctAns: number;
}

interface Answers extends Document {
  content: string;
}

export interface Result extends Document {
  user: ObjectId;
  correctAns:[number];
  checkedNum: number;
  score: number;
  fullScore: number;
}
