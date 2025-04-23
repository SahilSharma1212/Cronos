import { ImageDetailsType } from "@/types/ApiResponse";
import mongoose, { Schema, Document } from "mongoose";

// Image Details Schema
const ImageDetailsSchema = new Schema<ImageDetailsType>({
  userId: { type: String, required: true },
  fileId: { type: String, required: true },
  fileType: { type: String, required: true },
  size: { type: Number, required: true },
  height: { type: Number, required: true },
  width: { type: Number, required: true },
  path: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  url: { type: String },
  isImageAddedToAnyCapsule:{type:Boolean,required:true,default:false}
});

// Capsule Interface
export interface CronosCapsulesInterface extends Document {
  userId: string;
  capsuleName: string;
  createdAt: Date;
  openingDate: Date;
  description:string;
  content: string;
  privacyType: string;
  hasBeenOpened: boolean;
  imagesArray: ImageDetailsType[];
}

// User Interface
export interface CronosUserSchemaInterface extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isUserVerified: boolean;
  friends: string[];
  isPrivateAccount: boolean;
  allCapsules: CronosCapsulesInterface[];
}

// Capsule Schema
const CronosCapsuleSchema = new Schema<CronosCapsulesInterface>({
  userId: { type: String, required: true },
  capsuleName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  openingDate: { type: Date, required: true },
  description:{type:String},
  content: {
    type: String,
    required: [true, "Capsule content cannot be empty"],
    min: [20, "Content must have at least 20 characters"],
    max: [1000, "Content must not exceed 1000 characters"],
  },
  privacyType: {
    type: String,
    enum: ["public", "private"],
    required: true,
    default: "public",
  },
  hasBeenOpened: { type: Boolean, required: true, default: false },
  imagesArray: {
    type: [ImageDetailsSchema],
    default: [],
  },
});

// User Schema
const CronosUserSchema = new Schema<CronosUserSchemaInterface>({
  username: {
    type: String,
    required: [true, "Username cannot be empty"],
    unique: true,
    min:[3,"username must be atleast 3 characters"],
    max:[20,"username must not exceed 20 characters"]
  },
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  verifyCode: { type: String, required: true },
  verifyCodeExpiry: { type: Date, required: true },
  isUserVerified: { type: Boolean, default: false, required: true },
  friends: { type: [String], default: [] },
  isPrivateAccount: { type: Boolean, default: false },
  allCapsules: { type: [CronosCapsuleSchema], default: [] },
});

// Models
const CronosCapsuleModel =
  mongoose.models.CronosCapsule ||
  mongoose.model<CronosCapsulesInterface>("CronosCapsule", CronosCapsuleSchema);

const CronosUserModel =
  mongoose.models.CronosUser ||
  mongoose.model<CronosUserSchemaInterface>("CronosUser", CronosUserSchema);

const CronosImageModel =
  mongoose.models.ImageDetails ||
  mongoose.model<ImageDetailsType>("ImageDetails", ImageDetailsSchema);

export { CronosCapsuleModel, CronosUserModel, CronosImageModel };
