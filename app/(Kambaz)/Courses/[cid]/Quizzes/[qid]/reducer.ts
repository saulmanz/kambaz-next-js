/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface QuestionState {
  questions: any[];
}

const initialState: QuestionState = {
  questions: [],
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },

    addQuestion(state, action: PayloadAction<any>) {
      state.questions.push(action.payload);
    },

    deleteQuestion: (state, { payload: questionId }) => {
      state.questions = state.questions.filter(
        (m: any) => m._id !== questionId);
    },

    updateQuestion: (state, { payload: question }) => {
      state.questions = state.questions.map((m: any) =>
        m._id === question._id ? question : m
      ) as any;
    },

    editQuestion: (state, { payload: questionId }) => {
      state.questions = state.questions.map((m: any) =>
        m._id === questionId ? { ...m, editing: true } : m
      ) as any;
    },
  },
});
export const { addQuestion, deleteQuestion, updateQuestion, editQuestion, setQuestions } =
  questionsSlice.actions;
export default questionsSlice.reducer;