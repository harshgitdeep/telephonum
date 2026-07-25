import fs from "fs";
import path from "path";
import Call, { ICall } from "./call.model";
import { UPLOAD_CONFIG } from "../../config/upload.config";

class CallService {
  async createCall(callData: {
    userId: string;
    originalFileName: string;
    storedFileName: string;
    mimeType: string;
    size: number;
  }): Promise<ICall> {
    return Call.create(callData);
  }

  async getCallsByUser(userId: string): Promise<ICall[]> {
    return Call.find({ userId }).sort({ createdAt: -1 });
  }

  async getCallById(id: string): Promise<ICall | null> {
    return Call.findById(id);
  }

  async deleteCall(id: string): Promise<ICall | null> {
    const call = await Call.findById(id);
    if (!call) {
      return null;
    }

    // Delete the file from the filesystem if it exists
    const filePath = path.join(UPLOAD_CONFIG.AUDIO_DIRECTORY, call.storedFileName);
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.error(`Failed to delete file at ${filePath}:`, error);
    }

    return Call.findByIdAndDelete(id);
  }
}

export default new CallService();
