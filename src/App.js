// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './page/loginpage';  // Import the LoginPage component
import Dashboard from './page/AttendanceForm';  // Example protected route (optional)

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define the route for the LoginPage */}
        <Route path="/login" element={<LoginPage />} />

        {/* Example route for a protected page after login */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Add a default route or redirect to /login */}
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
