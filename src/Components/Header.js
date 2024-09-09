import React, { useState } from 'react';
import { PlusCircle, Search, Bell, ChevronDown } from 'lucide-react'; // ChevronDown for dropdown icon
import './Header.css';
import Modal from 'react-modal'; // We will use a modal for the popup

const Header = ({ addTaskToBacklog }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);  // State to toggle search box
  const [isModalOpen, setIsModalOpen] = useState(false);    // State to toggle task popup
  const [newTask, setNewTask] = useState({ title: '', type: 'Task', points: 0, priority: 'Medium' });
  const [searchQuery, setSearchQuery] = useState('');       // State for search query
  const [isDropdownOpen, setIsDropdownOpen] = useState({}); // State for dropdown menus

  // Handle search input toggle
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // Handle task modal toggle
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle task submission
  const handleAddTask = () => {
    if (newTask.title.trim() === '') return;
    addTaskToBacklog(newTask); // This function will be passed as a prop to add tasks to the backlog
    setNewTask({ title: '', type: 'Task', points: 0, priority: 'Medium' });
    setIsModalOpen(false); // Close the modal after adding the task
  };

  // Toggle dropdown for navigation menus
  const toggleDropdown = (menu) => {
    setIsDropdownOpen((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  return (
    <>
      <header className="header">
        <div className="header-title">
          <span>Project Management</span>
        </div>

        <nav className="header-nav">
          <div className="nav-item dropdown-container">
            <div className="dropdown-toggle" onClick={() => toggleDropdown('yourWork')}>
              Your Work <ChevronDown className="dropdown-icon" />
            </div>
            {isDropdownOpen['yourWork'] && (
              <div className="dropdown-menu horizontal-menu">
                <div className="dropdown-item">Recent</div>
                <div className="dropdown-item">Favorites</div>
                <div className="dropdown-item">Assigned to me</div>
              </div>
            )}
          </div>

          <div className="nav-item dropdown-container">
            <div className="dropdown-toggle" onClick={() => toggleDropdown('projects')}>
              Projects <ChevronDown className="dropdown-icon" />
            </div>
            {isDropdownOpen['projects'] && (
              <div className="dropdown-menu horizontal-menu">
                <div className="dropdown-item">All Projects</div>
                <div className="dropdown-item">My Projects</div>
                <div className="dropdown-item">Archived Projects</div>
              </div>
            )}
          </div>

          <div className="nav-item dropdown-container">
            <div className="dropdown-toggle" onClick={() => toggleDropdown('filters')}>
              Filters <ChevronDown className="dropdown-icon" />
            </div>
            {isDropdownOpen['filters'] && (
              <div className="dropdown-menu horizontal-menu">
                <div className="dropdown-item">By Status</div>
                <div className="dropdown-item">By Priority</div>
                <div className="dropdown-item">By Date</div>
              </div>
            )}
          </div>

          <div className="nav-item">
            Dashboard
          </div>
        </nav>

        <div className="header-icons">
          {/* Plus button to add task */}
          <PlusCircle className="icon" onClick={toggleModal} />

          {/* Search button */}
          <div className="search-container">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks..."
                className="search-input"
              />
          </div>

          {/* Bell for notifications */}
          <Bell className="icon" />

          {/* User avatar */}
          <div className="user-avatar"></div>
        </div>
      </header>

      {/* Task creation modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="Add New Task"
        className="task-modal"
        overlayClassName="task-modal-overlay"
      >
        <h2>Add New Task</h2>
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Task title"
          className="modal-input"
        />
        <select
          value={newTask.type}
          onChange={(e) => setNewTask({ ...newTask, type: e.target.value })}
          className="modal-select"
        >
          <option value="Task">Task</option>
          <option value="Story">Story</option>
          <option value="Bug">Bug</option>
        </select>
        <input
          type="number"
          value={newTask.points}
          onChange={(e) => setNewTask({ ...newTask, points: parseInt(e.target.value) })}
          placeholder="Points"
          className="modal-input"
        />
        <select
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
          className="modal-select"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
        <button className="modal-button" onClick={handleAddTask}>Add Task</button>
      </Modal>
    </>
  );
};

export default Header;
