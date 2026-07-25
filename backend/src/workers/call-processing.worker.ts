import { Worker, Job } from "bullmq";
import { redisConnection } from "../config/redis";
import Call, { AIProvider } from "../modules/calls/call.model";
import assemblyaiService from "../services/assemblyai.service";
import { CALL_PROCESSING_QUEUE_NAME } from "../queues/call-processing.queue";

const processCallJob = async (job: Job<{ callId: string }>) => {
  const { callId } = job.data;
  console.log(`[Worker] Started processing call job ${job.id} for callId: ${callId}`);

  const call = await Call.findById(callId);
  if (!call) {
    throw new Error(`Call document not found for ID: ${callId}`);
  }

  try {
    // 1. Update status to TRANSCRIBING
    call.status = "TRANSCRIBING";
    call.statusTimeline = call.statusTimeline || [];
    call.statusTimeline.push({
      status: "TRANSCRIBING",
      timestamp: new Date(),
      message: "Worker picked up job. Initiating AssemblyAI audio upload and transcription with Speaker Diarization.",
    });
    await call.save();
    console.log(`[Worker] Status updated to TRANSCRIBING for call: ${callId}`);

    // 2. Perform transcription
    const result = await assemblyaiService.transcribeAudio(call.storedFileName);

    // 3. Save results and update status to COMPLETED
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
    call.statusTimeline.push({
      status: "COMPLETED",
      timestamp: new Date(),
      message: "AssemblyAI transcription completed and speaker utterances saved successfully.",
    });
    await call.save();
    console.log(`[Worker] Successfully completed transcription for call: ${callId}`);
  } catch (error: any) {
    console.error(`[Worker] Failed processing call ${callId}:`, error);
    call.status = "FAILED";
    call.error = error.message || "Unknown background processing error";
    call.statusTimeline = call.statusTimeline || [];
    call.statusTimeline.push({
      status: "FAILED",
      timestamp: new Date(),
      message: `Processing failed: ${error.message || error}`,
    });
    await call.save();
    throw error;
  }
};

export const callProcessingWorker = new Worker(
  CALL_PROCESSING_QUEUE_NAME,
  processCallJob,
  {
    connection: redisConnection,
    concurrency: 2,
  }
);

callProcessingWorker.on("completed", (job) => {
  console.log(`[Worker] Job ${job.id} completed successfully.`);
});

callProcessingWorker.on("failed", (job, err) => {
  console.error(`[Worker] Job ${job?.id} failed with error:`, err);
});
