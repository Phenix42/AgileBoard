import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  columns: {
    Backlog: {
      id: 'Backlog',
      tasks: []
    },
    ToDo: {
      id: 'ToDo',
      tasks: []
    },
    InProgress: {
      id: 'InProgress',
      tasks: []
    },
    Done: {
      id: 'Done',
      tasks: []
    }
  }
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { columnId, task } = action.payload;
      state.columns[columnId].tasks.push(task);
    },
    moveTask: (state, action) => {
      const { source, destination } = action.payload;
      if (!destination) return;

      const sourceColumn = state.columns[source.droppableId];
      const destColumn = state.columns[destination.droppableId];
      const [removed] = sourceColumn.tasks.splice(source.index, 1);

      destColumn.tasks.splice(destination.index, 0, removed);
    }
  }
});

export const { addTask, moveTask } = tasksSlice.actions;
export default tasksSlice.reducer;
