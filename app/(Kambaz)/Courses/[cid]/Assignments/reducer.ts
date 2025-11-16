import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Assignment {
  _id: string;
  title: string;
  course: string;
  available: string;
  due: string;
  points: number;
  group: string;
}

interface AssignmentState {
  assignments: Assignment[];
}

const initialState: AssignmentState = {
  assignments: [],
};

const assignmentSlice = createSlice({
  name: "assignmentReducer",
  initialState,
  reducers: {
    setAssignments(state, action: PayloadAction<Assignment[]>) {
      state.assignments = action.payload;
    },

    addAssignment(state, action: PayloadAction<Assignment>) {
      state.assignments.push(action.payload);
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateAssignment(state, action: PayloadAction<any>) {
      state.assignments = state.assignments.map((a) =>
        a._id === action.payload._id ? action.payload : a
      );
    },

    deleteAssignment(state, action: PayloadAction<string>) {
      state.assignments = state.assignments.filter(
        (a) => a._id !== action.payload
      );
    },
  },
});

export const {
  setAssignments,
  addAssignment,
  updateAssignment,
  deleteAssignment,
} = assignmentSlice.actions;

export default assignmentSlice.reducer;
