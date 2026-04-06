import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  tagline: { type: String },
  description: { type: String, required: true },
  posterURL: { type: String },
  dateTime: { type: Date, required: true },
  venue: { type: String },
  prizePool: [{
    position: { type: Number, required: true },
    amount: { type: Number, required: true }
  }],
  minTeamSize: { type: Number, default: 1 },
  maxTeamSize: { type: Number, default: 1 },
  maxCapacity: { type: Number, required: true },
  registrationStatus: { type: String, enum: ["OPEN", "CLOSED", "FULL"], default: "OPEN" },
  isVisible: { type: Boolean, default: true },
  registrationFees: {
    standard: { type: Number },
    ieeeMember: { type: Number }
  },
  rules: [{ type: String }],
  faqs: [{
    question: { type: String, required: true },
    answer: { type: String, required: true }
  }],
  coordinators: [{
    name: { type: String, required: true },
    contactNumber: { type: String, required: true }
  }]
}, { timestamps: true });

export const EventModel = mongoose.models.Event || mongoose.model("Event", eventSchema);
