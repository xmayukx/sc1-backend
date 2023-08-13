import mongoose from "mongoose";
import { User, UserRole } from "../types";

const userSchema = new mongoose.Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: Object.values(UserRole), required: true },
  picture: {
    type: String,
    required: true,
  },
  updated_at: {
    type: String,
    required: true,
  },
});

export default mongoose.model<User>("User", userSchema);
// { "given_name": "Anindo Neel",
//  "family_name": "Dutta",
// //   "nickname": "and24903", "name": "Anindo Neel Dutta", "picture": "https://lh3.googleusercontent.com/a/AAcHTtcixO9prQVoF-uPBnFEMm_i-GoxT34n1B_7tVMCLSNtDlg=s96-c", "locale": "en", "updated_at": "2023-08-12T14:43:11.046Z", "email": "and24903@gmail.com", "email_verified": true, "sub": "google-oauth2|110736075488342045293" }
