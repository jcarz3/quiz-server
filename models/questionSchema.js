import mongoose from "mongoose";
const { Schema } = mongoose;

/** question model */
const questionModel = new Schema({
  questions: { type: Array, default: [] }, // create question with [] default value
  answers: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now },
  correct: { type: String },
});

export default mongoose.model("Question", questionModel);
