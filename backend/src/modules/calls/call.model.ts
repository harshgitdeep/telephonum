import mongoose, { Schema, Document } from "mongoose";

export enum AIProvider {
  ASSEMBLY_AI = "AssemblyAI",
}

export interface ICall extends Document {
  userId: mongoose.Types.ObjectId;
  originalFileName: string;
  storedFileName: string;
  mimeType: string;
  size: number;
  status: "UPLOADED" | "TRANSCRIBING" | "COMPLETED" | "FAILED";
  error?: string;
  transcription?: {
    transcriptId: string;
    provider: AIProvider;
    text: string;
    language?: string;
    confidence?: number;
    duration?: number;
    completedAt?: Date;
    utterances?: Array<{
      speaker: string;
      text: string;
      start: number;
      end: number;
    }>;
  };
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
      enum: ["UPLOADED", "TRANSCRIBING", "COMPLETED", "FAILED"],
      default: "UPLOADED",
    },
    error: {
      type: String,
      default: "",
    },
    transcription: {
      transcriptId: { type: String },
      provider: { type: String, enum: Object.values(AIProvider) },
      text: { type: String },
      language: { type: String },
      confidence: { type: Number },
      duration: { type: Number },
      completedAt: { type: Date },
      utterances: [
        {
          speaker: { type: String, required: true },
          text: { type: String, required: true },
          start: { type: Number, required: true },
          end: { type: Number, required: true },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Call = mongoose.model<ICall>("Call", callSchema);
export default Call;

