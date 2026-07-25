import { Queue } from "bullmq";
import { redisConnection } from "../config/redis";

export const CALL_PROCESSING_QUEUE_NAME = "call-processing";

export const callProcessingQueue = new Queue(CALL_PROCESSING_QUEUE_NAME, {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});

/**
 * Enqueues a call processing job to Redis.
 * @param callId The MongoDB ObjectId string of the Call document
 */
export const addCallProcessingJob = async (callId: string): Promise<void> => {
  await callProcessingQueue.add(
    "process-call",
    { callId },
    {
      jobId: callId, // Prevent duplicate jobs for the same call by utilizing callId as jobId
    }
  );
};
