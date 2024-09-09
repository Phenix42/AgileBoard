import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, moveTask } from '../Redux/tasksSlice';
import SideNavBar from './SideNavBar';
import Header from './Header';
import './ProjectManagementBoard.css';

const ProjectManagementBoard = () => {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.tasks.columns);
  const [newTask, setNewTask] = useState({ title: '', type: 'Task', points: 0, priority: 'Medium' });
  const [searchQuery, setSearchQuery] = useState('');

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return; // If dropped outside the list, do nothing
    dispatch(moveTask({ source, destination }));
  };

  const addNewTask = () => {
    if (newTask.title.trim() === '') return;
    const task = {
      id: Date.now().toString(),
      ...newTask,
      user: 'Current User'
    };
    dispatch(addTask({ columnId: 'ToDo', task }));
    setNewTask({ title: '', type: 'Task', points: 0, priority: 'Medium' });
  };

  return (
    <div className="project-management">
      <Header />
      <div className="main-content">
        <SideNavBar />

        <main className="board">
          <div className="new-task-section">
            <h2 className="new-task-heading">BOARD</h2>
          </div>

          {/* Drag and Drop for ToDo, InProgress, Done */}
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="columns">
              {/* Only render the ToDo, InProgress, and Done columns */}
              {Object.entries(columns).map(([columnId, column]) => {
                if (columnId !== 'Backlog') {
                  return (
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="column"
                        >
                          <h2 className="column-title">{columnId}</h2>
                          {column.tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="task-card"
                                >
                                  <div className="task-card-header">
                                    <h3 className="task-title">{task.title}</h3>
                                    <span className="task-number">SME-{task.taskNumber}</span> 
                                  </div>
                                  <div className="task-info">
                                    <span className={`task-type ${task.type.toLowerCase()}`}>{task.type}</span>
                                    <span className={`task-priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
                                  </div>
                                  <div className="task-details">
                                    <span className="task-user">{task.user}</span>
                                    <span className="task-points">{task.points} pts</span>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  );
                } else {
                  return null; // Do not render the Backlog column here
                }
              })}
            </div>
          </DragDropContext>
        </main>
      </div>
    </div>
  );
};

export default ProjectManagementBoard;
