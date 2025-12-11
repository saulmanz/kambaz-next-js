import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";
import model from "./model.js";

export default function QuizzesDao() {

  const findQuizzesForCourse = (courseId) => {
    return model.find({ course: courseId }).exec();
  };

  const findQuizById = (quizId) => {
    return model.findById(quizId);
  };

  const createQuiz = (quiz) => {
    const newQuiz = {
      ...quiz,
      _id: uuidv4(),
    };
    return model.create(newQuiz);
  };

  const updateQuiz = (quizId, updatedQuiz) => {
    return model.updateOne(
      { _id: quizId },
      { $set: updatedQuiz },
      { new: true }
    )
  };

  const deleteQuiz = (quizId) => {
    return model.deleteOne({ _id: quizId })
  };

  const togglePublish = async (quizId) => {
    const quiz = await model.findOne({ _id: quizId });
    if (!quiz) return null;

    quiz.published = !quiz.published;
    return quiz.save();
  };

  const submitQuizScore = async (quizId, studentId, score, answers = {}) => {
    const quiz = await model.findOne({ _id: quizId })
    if (!quiz) return null;

    // Initialize studentScores if it doesn't exist
    if (!quiz.studentScores) {
      quiz.studentScores = [];
    }

    // Find existing score entry for this student
    const existingScoreIndex = quiz.studentScores.findIndex(
      (s) => String(s.studentId) === String(studentId) || s.studentId === studentId
    );

    const attempt = existingScoreIndex >= 0 
      ? (quiz.studentScores[existingScoreIndex].attempt || 0) + 1
      : 1;

    const scoreEntry = {
      studentId: studentId,
      lastScore: score,
      attempt: attempt,
      answers: answers // Store student's answers
    };

    if (existingScoreIndex >= 0) {
      // Update existing score
      quiz.studentScores[existingScoreIndex] = scoreEntry;
    } else {
      // Add new score entry
      quiz.studentScores.push(scoreEntry);
    }

    return quiz.save();
  };

  return {
    findQuizzesForCourse,
    findQuizById,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    togglePublish,
    submitQuizScore
  };
}
