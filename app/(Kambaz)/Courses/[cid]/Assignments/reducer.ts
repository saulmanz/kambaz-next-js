import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { assignments as initialAssignments } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

export interface Assignment {
  _id: string;
  title: string;
  course: string;
  available: string;
  due: string;
  points: number;
  editing?: boolean;
}

interface AssignmentState {
  assignments: Assignment[];
}

const initialState: AssignmentState = {
  assignments: initialAssignments,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (
      state,
      { payload }: PayloadAction<{
        name: string;
        course: string;
        availableDate: string;
        dueDate: string;
        points: number;
      }>
    ) => {
      const newAssignment: Assignment = {
        _id: uuidv4(),
        title: payload.name,
        course: payload.course,
        available: payload.availableDate,
        due: payload.dueDate,
        points: payload.points,
      };
      state.assignments.push(newAssignment);
    },

    deleteAssignment: (state, { payload }: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(a => a._id !== payload);
    },

    updateAssignment: (state, { payload }: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map(a =>
        a._id === payload._id ? payload : a
      );
    },

    editAssignment: (state, { payload }: PayloadAction<string>) => {
      state.assignments = state.assignments.map(a =>
        a._id === payload ? { ...a, editing: true } : a
      );
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment, editAssignment } =
  assignmentsSlice.actions;

export default assignmentsSlice.reducer;
