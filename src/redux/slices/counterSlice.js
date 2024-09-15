import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "alphabetTask",
  initialState: {
    word: "",
    clickWork: "",
    attempts: [],
  },
  reducers: {
    wordFunction: (state, actions) => {
      state.word = actions.payload;
    },
    wclickWorkFunction: (state, actions) => {
      state.clickWork = actions.payload;
    },
    attemptsFn: (state, actions) => {
      state.attempts = actions.payload;
    },
  },
});

export const { wclickWorkFunction, wordFunction, attemptsFn } = slice.actions;

export default slice.reducer;
