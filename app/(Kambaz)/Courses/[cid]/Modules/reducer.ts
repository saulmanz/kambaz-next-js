import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { modules as initialModules } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

export interface Lesson {
  _id: string;
  name: string;
}

export interface Module {
  _id: string;
  name: string;
  course: string;
  lessons: Lesson[];
  editing?: boolean;
}

interface ModulesState {
  modules: Module[];
}

const initialState: ModulesState = {
  modules: initialModules,
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addModule: (
      state,
      { payload }: PayloadAction<{ name: string; course: string }>
    ) => {
      const newModule: Module = {
        _id: uuidv4(),
        name: payload.name,
        course: payload.course,
        lessons: [],
      };
      state.modules.push(newModule);
    },

    deleteModule: (state, { payload }: PayloadAction<string>) => {
      state.modules = state.modules.filter((m) => m._id !== payload);
    },

    updateModule: (state, { payload }: PayloadAction<Module>) => {
      state.modules = state.modules.map((m) =>
        m._id === payload._id ? payload : m
      );
    },

    editModule: (state, { payload }: PayloadAction<string>) => {
      state.modules = state.modules.map((m) =>
        m._id === payload ? { ...m, editing: true } : m
      );
    },
  },
});

export const { addModule, deleteModule, updateModule, editModule } =
  modulesSlice.actions;

export default modulesSlice.reducer;
