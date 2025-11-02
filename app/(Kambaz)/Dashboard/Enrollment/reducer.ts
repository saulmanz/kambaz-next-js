import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../../Database";
import { v4 as uuidv4 } from "uuid";
const initialState = {
 enrollments: enrollments,
};
const enrollmentSlice = createSlice({
 name: "courses",
 initialState,
 reducers: {
   addNewEnrollment: (state, { payload: enrollment }) => {
     const newEnrollment = { user: enrollment.user, course: enrollment.course, _id: uuidv4() };
     state.enrollments = [...state.enrollments, newEnrollment] as any;
   },
   deleteEnrollment: (state, { payload: enrollmentId }) => {
     state.enrollments = state.enrollments.filter(
       (enrollment: any) => enrollment._id !== enrollmentId
     );
   },
 },
});
export const { addNewEnrollment, deleteEnrollment } =
 enrollmentSlice.actions;
export default enrollmentSlice.reducer;