import { z } from "zod";
import mongoose from "mongoose";

// Helper to validate Mongoose ObjectId
export const objectIdSchema = z.string().refine(
  (val) => mongoose.Types.ObjectId.isValid(val),
  { message: "Invalid Call ID format" }
);

export const getCallSchema = z.object({
  id: objectIdSchema,
});

export const deleteCallSchema = z.object({
  id: objectIdSchema,
});
