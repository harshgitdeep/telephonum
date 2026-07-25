import { AssemblyAI } from "assemblyai";
import path from "path";
import { UPLOAD_CONFIG } from "../config/upload.config";

export interface Utterance {
  speaker: string;
  text: string;
  start: number;
  end: number;
}

export interface TranscriptionResponse {
  transcriptId: string;
  text: string;
  language: string;
  confidence: number;
  duration: number;
  utterances: Utterance[];
}

class AssemblyAIService {
  private client: AssemblyAI | null = null;

  private getClient(): AssemblyAI {
    if (!this.client) {
      const apiKey = process.env.ASSEMBLYAI_API_KEY;
      if (!apiKey) {
        throw new Error("ASSEMBLYAI_API_KEY is not defined in the environment variables.");
      }
      this.client = new AssemblyAI({ apiKey });
    }
    return this.client;
  }

  /**
   * Transcribes a locally stored audio file using the AssemblyAI Node.js SDK.
   * Automatically handles uploading and polling with Speaker Diarization enabled.
   */
  async transcribeAudio(fileName: string): Promise<TranscriptionResponse> {
    const client = this.getClient();
    const filePath = path.join(UPLOAD_CONFIG.AUDIO_DIRECTORY, fileName);

    const transcript = await client.transcripts.transcribe({
      audio: filePath,
      speaker_labels: true,
    });

    if (transcript.status === "error") {
      throw new Error(`AssemblyAI transcription failed: ${transcript.error}`);
    }

    const utterances = transcript.utterances
      ? transcript.utterances.map((u) => ({
          speaker: u.speaker,
          text: u.text,
          start: u.start,
          end: u.end,
        }))
      : [];

    return {
      transcriptId: transcript.id,
      text: transcript.text || "",
      language: transcript.language_code || "en",
      confidence: transcript.confidence || 0,
      duration: transcript.audio_duration || 0,
      utterances,
    };
  }
}

export default new AssemblyAIService();
