import api from "./api";

export interface CallData {
  _id: string;
  userId: string;
  originalFileName: string;
  storedFileName: string;
  mimeType: string;
  size: number;
  status: "UPLOADED" | "TRANSCRIBING" | "PROCESSING" | "COMPLETED" | "FAILED";
  createdAt: string;
  updatedAt: string;
  transcription?: {
    transcriptId: string;
    provider: string;
    text: string;
    language?: string;
    confidence?: number;
    duration?: number;
    completedAt?: string;
    utterances?: Array<{
      speaker: string;
      text: string;
      start: number;
      end: number;
    }>;
  };
}

export interface CallResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export const uploadCall = (
  file: File,
  onProgress?: (progress: number) => void
) => {
  const formData = new FormData();
  formData.append("audio", file);

  return api.post<CallResponse<CallData>>("/calls", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(percentCompleted);
      }
    },
  });
};

export const getCalls = () => {
  return api.get<CallResponse<CallData[]>>("/calls");
};

export const getCall = (id: string) => {
  return api.get<CallResponse<CallData>>(`/calls/${id}`);
};

export const deleteCall = (id: string) => {
  return api.delete<CallResponse<null>>(`/calls/${id}`);
};
