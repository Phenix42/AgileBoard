import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProjectManagementBoard from './Components/projectmanagementboard';
import BacklogPage from './Components/BacklogPage'; // Updated component name
// Import the common Layout component

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<ProjectManagementBoard />} />
          <Route path="/backlog" element={<BacklogPage />} />
        </Routes>
    </Router>
  );
}

export default App;
