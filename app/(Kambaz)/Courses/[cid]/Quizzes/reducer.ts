/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuizState {
  quizzes: any[];
}

const initialState: QuizState = {
  quizzes: [],
};

const quizzesSlice = createSlice({
  name: "quizReducer",
  initialState,
  reducers: {
    setQuiz(state, action: PayloadAction<any[]>) {
      state.quizzes = action.payload;
    },

    addQuiz(state, action: PayloadAction<any>) {
      state.quizzes.push(action.payload);
    },

    updateQuiz(state, action: PayloadAction<any>) {
      state.quizzes = state.quizzes.map((a) =>
        a._id === action.payload._id ? action.payload : a
      );
    },

    deleteQuiz(state, action: PayloadAction<string>) {
      state.quizzes = state.quizzes.filter(
        (a) => a._id !== action.payload
      );
    },
  },
});

export const {
  setQuiz,
  addQuiz,
  updateQuiz,
  deleteQuiz,
} = quizzesSlice.actions;

export default quizzesSlice.reducer;
