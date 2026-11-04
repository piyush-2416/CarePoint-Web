import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    patient: {
      name: { type: String, required: true },
      age: { type: Number, required: true },
      livingSituation: { type: String, required: true },
      location: { type: String, default: "" },
    },
    conditions: [String],
    emergencyRisks: [String],
    careNeeds: [String],
    resources: [String],
    notes: { type: String, default: "" },

    plan: { type: mongoose.Schema.Types.Mixed, required: true }, // AI ka banaya plan
    done: { type: [String], default: [] }, // tick kiye hue checklist item ids
    fallback: { type: Boolean, default: false }, // AI fail hua to true
  },
  { timestamps: true }
);

export default mongoose.model("Plan", planSchema);
