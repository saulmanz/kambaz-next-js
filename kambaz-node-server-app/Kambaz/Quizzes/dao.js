import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";
import model from "./model.js";

export default function QuizzesDao() {

  const findQuizzesForCourse = (courseId) => {
    return model.find({ course: courseId }).exec();
  };

  const findQuizById = (quizId) => {
    if (!quizId) return null;

    const query = mongoose.Types.ObjectId.isValid(quizId)
      ? { $or: [{ _id: quizId }, { _id: new mongoose.Types.ObjectId(quizId) }] }
      : { _id: quizId };

    return model.findOne(query).exec();
  };

  const createQuiz = (quiz) => {
    const newQuiz = {
      ...quiz,
      _id: uuidv4(),
    };
    return model.create(newQuiz);
  };

  const updateQuiz = (quizId, updatedQuiz) => {
    return model.findOneAndUpdate(
      { _id: quizId },
      { $set: updatedQuiz },
      { new: true }
    ).exec();
  };

  const deleteQuiz = (quizId) => {
    return model.findOneAndDelete({ _id: quizId }).exec();
  };

  const togglePublish = async (quizId) => {
    const quiz = await model.findById(quizId).exec();
    if (!quiz) return null;

    quiz.published = !quiz.published;
    return quiz.save();
  };

  return {
    findQuizzesForCourse,
    findQuizById,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    togglePublish
  };
}
