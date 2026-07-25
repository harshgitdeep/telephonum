import fs from "fs";
import path from "path";
import Call, { ICall, AIProvider } from "./call.model";
import { UPLOAD_CONFIG } from "../../config/upload.config";
import assemblyaiService from "../../services/assemblyai.service";

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

  /**
   * Orchestrates the call processing lifecycle:
   * 1. Creates Call in MongoDB (status: UPLOADED)
   * 2. Sets status to TRANSCRIBING
   * 3. Transcribes using AssemblyAI Service
   * 4. Stores transcription and status COMPLETED (or FAILED with error)
   * 5. Triggers post-transcription pipeline for future integrations (Gemini, etc.)
   */
  async processUploadedCall(
    userId: string,
    file: Express.Multer.File
  ): Promise<ICall> {
    // 1. Create initial Call document
    const call = await this.createCall({
      userId,
      originalFileName: file.originalname,
      storedFileName: file.filename,
      mimeType: file.mimetype,
      size: file.size,
    });

    try {
      // 2. Update status to TRANSCRIBING
      call.status = "TRANSCRIBING";
      await call.save();

      // 3. Call AssemblyAI Service
      const result = await assemblyaiService.transcribeAudio(call.storedFileName);

      // 4. Save transcription details and status COMPLETED
      call.status = "COMPLETED";
      call.transcription = {
        transcriptId: result.transcriptId,
        provider: AIProvider.ASSEMBLY_AI,
        text: result.text,
        language: result.language,
        confidence: result.confidence,
        duration: result.duration,
        completedAt: new Date(),
        utterances: result.utterances,
      };
      await call.save();

      // 5. Trigger extensible pipeline for downstream tasks
      await this.postTranscriptionPipeline(call);
    } catch (error: any) {
      console.error(`Transcription process failed for call ${call._id}:`, error);
      call.status = "FAILED";
      call.error = error.message || "Unknown transcription error";
      await call.save();
      throw error;
    }

    return call;
  }

  /**
   * Extensible pipeline hooks to run downstream tasks (e.g. Gemini analysis)
   * in subsequent phases.
   */
  private async postTranscriptionPipeline(call: ICall): Promise<void> {
    // Placeholder for future features (e.g., Gemini summaries, QA scorecards, etc.)
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

