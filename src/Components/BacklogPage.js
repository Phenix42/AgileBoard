import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, moveTask } from '../Redux/tasksSlice';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './BacklogPage.css';
import SideNavBar from './SideNavBar';
import Header from './Header';

const BacklogPage = () => {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.tasks.columns);
  const backlogTasks = columns.Backlog?.tasks || [];
  const toDoTasks = columns.ToDo?.tasks || [];
  const [newTask, setNewTask] = useState({ title: '', type: 'Task', points: 0, priority: 'Medium' });

  const addNewTask = () => {
    if (newTask.title.trim() === '') return;
  
    // Generate a 5-digit number
    const taskNumber = Math.floor(10000 + Math.random() * 90000);
    
    const task = {
      id: Date.now().toString(),
      taskNumber,  // Make sure the taskNumber is being set
      ...newTask,
      user: 'Current User'
    };
    
    console.log(taskNumber); // Add this to check if the number is correctly generated
  
    dispatch(addTask({ columnId: 'Backlog', task }));
    setNewTask({ title: '', type: 'Task', points: 0, priority: 'Medium' });
    
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return; // If dropped outside the list, do nothing

    dispatch(moveTask({ source, destination }));
  };

  return (
    <div className="project-management">
      <Header />
      <div className="main-content">
        <SideNavBar />
        <div className="backlog-page">
          <header className="backlog-header">
            <h1>Backlog</h1>
          </header>
          <div className="new-task-form">
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              placeholder="Enter task title"
              className="new-task-input"
            />
            <select
              value={newTask.type}
              onChange={(e) => setNewTask({ ...newTask, type: e.target.value })}
              className="new-task-select"
            >
              <option value="Task">Task</option>
              <option value="Story">Story</option>
              <option value="Bug">Bug</option>
            </select>
            <input
              type="number"
              value={newTask.points}
              onChange={(e) => setNewTask({ ...newTask, points: parseInt(e.target.value, 10) })}
              placeholder="Points"
              className="new-task-input"
            />
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              className="new-task-select"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
            <button onClick={addNewTask} className="new-task-button">Add Task</button>
          </div>

          {/* Drag and Drop for Backlog and ToDo */}
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="task-columns">
              {/* Backlog Column */}
              <Droppable droppableId="Backlog">
                {(provided) => (
                  <div
                    className="column backlog-column"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <h2>Backlog</h2>
                    {backlogTasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            className="task-card"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
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

              {/* To Do Column */}
              <Droppable droppableId="ToDo">
                {(provided) => (
                  <div
                    className="column todo-column"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <h2>To Do</h2>
                    {toDoTasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            className="task-card"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
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
            </div>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default BacklogPage;
