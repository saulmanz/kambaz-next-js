import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { enrollments as initialEnrollments } from "../../Database";
import { v4 as uuidv4 } from "uuid";

export interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface EnrollmentState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentState = {
  enrollments: initialEnrollments as Enrollment[],
};

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    addNewEnrollment: (
      state,
      { payload }: PayloadAction<Omit<Enrollment, "_id">>
    ) => {
      const newEnrollment: Enrollment = { ...payload, _id: uuidv4() };
      state.enrollments.push(newEnrollment);
    },

    deleteEnrollment: (state, { payload }: PayloadAction<string>) => {
      state.enrollments = state.enrollments.filter(
        (e) => e._id !== payload
      );
    },
  },
});

export const { addNewEnrollment, deleteEnrollment } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
