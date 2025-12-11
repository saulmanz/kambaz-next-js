/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(Kambaz)/Courses/[cid]/quizzes/client.ts
import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;

export const createQuiz = async (quizzes: any) => {
  const response = await axios.post(
    `${COURSES_API}/${quizzes.course}/quizzes`,
    quizzes
  );
  return response.data;
};

export const findQuizById = async (quizId: string) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const updateQuiz = async (quiz: any) => {
  const { data } = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const findQuizzesForCourse = async (cid: string) => {
  const { data } = await axios.get(`${COURSES_API}/${cid}/quizzes`);
  return data;
};

export const togglePublish = async (quizId: string) => {
  const response = await fetch(`${QUIZZES_API}/${quizId}/publish`, {
    method: "PUT",
  });
  return response.json();
};

const QUESTIONS_API = `${HTTP_SERVER}/api/questions`;

export const findQuestionsForQuiz = async (quizId: string) => {
  const response = await axios.get(`${COURSES_API}/${quizId}/questions`);
  return response.data;
};

export const createQuestion = async (courseId: string, quizId: string, question: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/${quizId}/questions`,
    question
  );
  return response.data;
};

export const updateQuestion = async (question: any) => {
  const response = await axios.put(`${QUESTIONS_API}/${question._id}`, question);
  return response.data;
};

export const deleteQuestion = async (questionId: string) => {
  const response = await axios.delete(`${QUESTIONS_API}/${questionId}`);
  return response.data;
};

export const submitQuizScore = async (quizId: string, studentId: string, score: number, answers: { [key: string]: any } = {}) => {
  const response = await axios.post(`${QUIZZES_API}/${quizId}/submit`, {
    studentId,
    score,
    answers
  });
  return response.data;
};

