import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    question: String,
    type: String,
    answers: [{ _id: String, name: String, correct: Boolean }],
  }
);
export default schema;
