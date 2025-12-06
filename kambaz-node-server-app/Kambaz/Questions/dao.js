import { v4 as uuidv4 } from "uuid";
import model from "../Quizzes/model.js";

export default function QuestionsDao() {
  
  async function findQuestionsForQuiz(quizId) {
    const quiz = await model.findById(quizId);
    if (!quiz) throw new Error("Quiz not found");
    return quiz.questions || []; // always return array
  }

  async function createQuestion(question) {
    const quiz = await model.findById(question.quiz);
    if (!quiz) throw new Error("Quiz not found");

    const newQuestion = { 
      ...question, 
      _id: uuidv4(), 
      answers: [], 
      points: question.points ?? 1 
    };

    quiz.questions = [...(quiz.questions || []), newQuestion];
    await quiz.save();
    return newQuestion;
  }

  async function deleteQuestion(questionId) {
    const quizes = await model.find({ "question._id": questionId });
    if (!quizes.length) return { deleted: false };
    const quiz = quizes[0];
    const before = quiz.questions.length;
    quiz.questions = quiz.questions.filter((q) => q._id !== questionId);
    await quiz.save();
    const after = quiz.questions.length;
    return { deleted: before !== after };
  }

  async function updateQuestion(questionId, questionUpdates) {
    const quizes = await model.find({ "question._id": questionId });
    if (!quizes.length) throw new Error("Question not found");
    const quiz = quizes[0];
    const question = quiz.questions.find((q) => q._id === questionId);
    Object.assign(question, questionUpdates);
    await quiz.save();
    return question;
  }

  return { findQuestionsForQuiz, createQuestion, deleteQuestion, updateQuestion };
}
