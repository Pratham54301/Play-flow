import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true },
    name: { type: String, required: true },
  },
  { _id: false }
);

const registrationSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["Solo", "Duo", "Squad"], required: true },
    players: { type: [playerSchema], required: true },
    fullName: { type: String, required: true },
    upiId: { type: String, required: true },
    paymentMode: { type: String, enum: ["Cash", "Online"], required: true },
    utrNumber: { type: String },
    cashCollectorName: { type: String },
    screenshot: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Registration =
  mongoose.models.Registration || mongoose.model("Registration", registrationSchema);