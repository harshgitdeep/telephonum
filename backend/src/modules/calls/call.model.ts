import mongoose, { Schema, Document } from "mongoose";

export interface ICall extends Document {
  userId: mongoose.Types.ObjectId;
  originalFileName: string;
  storedFileName: string;
  mimeType: string;
  size: number;
  status: "UPLOADED" | "PROCESSING" | "COMPLETED" | "FAILED";
  createdAt: Date;
  updatedAt: Date;
}

const callSchema = new Schema<ICall>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    originalFileName: { type: String, required: true },
    storedFileName: { type: String, required: true, unique: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    status: {
      type: String,
      enum: ["UPLOADED", "PROCESSING", "COMPLETED", "FAILED"],
      default: "UPLOADED",
    },
  },
  {
    timestamps: true,
  }
);

const Call = mongoose.model<ICall>("Call", callSchema);
export default Call;
