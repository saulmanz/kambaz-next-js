import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
  _id: String,
  title: { type: String, required: true },
  course: { type: String, required: true },
  instruction: { type: String, default: "" },
  available: { type: String, default: "" },
  due: { type: String, default: "" },
  until: { type: String, default: "" },
  points: { type: Number, default: 100 },
  questionTotal: { type: Number, default: 100 },
  type: { type: String, default: "Graded Quiz" },
  group: { type: String, default: "Quizzes" },
  shuffleAnswers: { type: Boolean, default: true },
  multipleAttempts: { type: Boolean, default: false },
  oneQuestion: { type: Boolean, default: false },
  webcamRequired: { type: Boolean, default: false },
  lockQuestions: { type: Boolean, default: false },
  showCorrect: { type: Boolean, default: false },
  timeLimit: { type: Number, default: 20 }, // in minutes
  accessCode: { type: String, default: 0 },
  studentScores: [
    {
      studentId: Number,
      lastScore: Number,
      attempt: Number,
    }
  ],
  questions: [
    {}
  ],
  published: { type: Boolean, default: false}
}, { collection: "quizzes" });

export default QuizSchema;
