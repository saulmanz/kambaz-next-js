import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { courses as initialCourses } from "../Database";
import { v4 as uuidv4 } from "uuid";

export interface Course {
  _id: string;
  name: string;
  number?: string;
  startDate?: string;
  endDate?: string;
  image?: string;
  description: string;
}

interface CoursesState {
  courses: Course[];
}

const initialState: CoursesState = {
  courses: initialCourses as Course[],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addNewCourse: (state, { payload }: PayloadAction<Omit<Course, "_id">>) => {
      const newCourse: Course = { ...payload, _id: uuidv4() };
      state.courses.push(newCourse);
    },

    deleteCourse: (state, { payload }: PayloadAction<string>) => {
      state.courses = state.courses.filter((c) => c._id !== payload);
    },

    updateCourse: (state, { payload }: PayloadAction<Course>) => {
      state.courses = state.courses.map((c) =>
        c._id === payload._id ? payload : c
      );
    },
  },
});

export const { addNewCourse, deleteCourse, updateCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
