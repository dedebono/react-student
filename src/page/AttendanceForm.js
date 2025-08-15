// AppContent.js
import React, { useState, useEffect } from 'react';
import useSocket from '../utils/useSocket';  // Import the custom hook

const AppContent = () => {
  const [memberCardNumber, setMemberCardNumber] = useState('');
  const [attendanceLogs, setAttendanceLogs] = useState([]);

  // Use the custom hook to initialize Socket.IO connection
  const socket = useSocket(process.env.REACT_APP_API_URL);

  // Load attendance logs from localStorage on component mount
  useEffect(() => {
    const savedLogs = localStorage.getItem('attendanceLogs');
    if (savedLogs) {
      setAttendanceLogs(JSON.parse(savedLogs)); // Parse the saved logs into the state
    }
  }, []);

  // Handle real-time updates through Socket.IO
  useEffect(() => {
    if (socket) {
      socket.on('attendanceUpdated', (data) => {
        const updatedLogs = [...attendanceLogs, data];
        setAttendanceLogs(updatedLogs);
        localStorage.setItem('attendanceLogs', JSON.stringify(updatedLogs)); // Save updated logs to localStorage
      });
    }

    return () => {
      if (socket) {
        socket.off('attendanceUpdated');
      }
    };
  }, [attendanceLogs, socket]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!memberCardNumber) {
      alert('Please enter a member card number.');
      return;
    }

    if (socket) {
      socket.emit('markPresent', memberCardNumber);  // Emit the markPresent event to the server
    }
  };

  const handleClearLogs = () => {
    setAttendanceLogs([]);
    localStorage.removeItem('attendanceLogs'); // Remove the logs from localStorage
  };

  return (
    <div>
      <h1>Attendance Form</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="memberCardNumber">Enter Member Card Number: </label>
          <input
            type="text"
            id="memberCardNumber"
            value={memberCardNumber}
            onChange={(e) => setMemberCardNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit">Mark Present</button>
      </form>

      <h2>Attendance Log</h2>
      <ul>
        {attendanceLogs.map((log, index) => (
          <li key={index}>
            {log.member} marked as {log.status} at {log.time}
          </li>
        ))}
      </ul>

      <button onClick={handleClearLogs}>Clear All Logs</button>
    </div>
  );
};

export default AppContent;
