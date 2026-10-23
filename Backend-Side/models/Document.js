const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 150 },
    category: { type: String, default: "Other" },
    notes: { type: String, default: "" },
    originalName: { type: String, required: true }, // user ki original file ka naam
    storedName: { type: String, required: true },   // server par save hui file ka naam
    mimeType: { type: String },
    fileSize: { type: Number },                     // bytes me
  },
  { timestamps: true } // createdAt, updatedAt khud ban jayenge
);

module.exports = mongoose.model("Document", documentSchema);
