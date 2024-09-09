// src/store/backlogSlice.js
import { createSlice } from '@reduxjs/toolkit';

const backlogSlice = createSlice({
  name: 'backlog',
  initialState: {
    tasks: [],
  },
  reducers: {
    addTaskToBacklog: (state, action) => {
      state.tasks.push({
        ...action.payload,
        id: Date.now().toString(),
      });
    },
  },
});

export const { addTaskToBacklog } = backlogSlice.actions;
export default backlogSlice.reducer;
