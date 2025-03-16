import mongoose from "mongoose";

const wardSchema = new mongoose.Schema({
  wardNumber: { type: Number, required: true, unique: true },
  wardName: { type: String, required: true },
  totalBeds: { type: Number, required: true },
  availableBeds: { type: Number, required: true },
});

export const Ward = mongoose.model("Ward", wardSchema); // ✅ Named export
