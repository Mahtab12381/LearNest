import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TabState {
  createcourseTab: number;
  tabComplete: number;
  courseBasic: object;
  lesson: object;
}

const initialState: TabState = {
    createcourseTab: 1,
    tabComplete: 0,
    courseBasic: {},
    lesson: {},
};

const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    addTab: (state, action: PayloadAction<{ createcourseTab: number }>) => {
      state.createcourseTab = action.payload.createcourseTab;
    },
    doneTab: (state, action: PayloadAction<{ tabComplete: number }>) => {
      state.tabComplete = action.payload.tabComplete;
    },
    addCourseBasic: (state, action: PayloadAction<{ courseBasic: object }>) => {
      state.courseBasic = action.payload.courseBasic;
    },
    addCourseLesson: (state, action: PayloadAction<{ lesson: object }>) => {
      state.lesson = action.payload.lesson;
    }
  },
});

export const {addTab,doneTab,addCourseBasic,addCourseLesson} = tabSlice.actions;

export default tabSlice.reducer;
