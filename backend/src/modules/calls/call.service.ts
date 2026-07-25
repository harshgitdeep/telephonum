import fs from "fs";
import path from "path";
import Call, { ICall, AIProvider } from "./call.model";
import { UPLOAD_CONFIG } from "../../config/upload.config";
import { addCallProcessingJob } from "../../queues/call-processing.queue";

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
   * 1. Creates Call in MongoDB (status: QUEUED)
   * 2. Enqueues the processing job in BullMQ
   * 3. Returns the created Call immediately
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

    call.statusTimeline = [
      {
        status: "QUEUED",
        timestamp: new Date(),
        message: "Call record created. Queueing background processing job.",
      },
    ];
    await call.save();

    try {
      // 2. Queue the processing job in BullMQ
      await addCallProcessingJob(call._id.toString());
      call.statusTimeline.push({
        status: "QUEUED",
        timestamp: new Date(),
        message: "Job enqueued successfully. Waiting for background worker to pick it up.",
      });
      await call.save();
    } catch (queueError: any) {
      console.error(`Failed to enqueue job for call ${call._id}:`, queueError);
      call.status = "FAILED";
      call.error = `Queue submission failed: ${queueError.message || queueError}. Make sure Redis is running.`;
      call.statusTimeline.push({
        status: "FAILED",
        timestamp: new Date(),
        message: `Queue submission failed. Redis is offline or unreachable.`,
      });
      await call.save();
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

