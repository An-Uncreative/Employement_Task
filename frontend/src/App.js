// src/App.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import UploadForm from "./components/UploadForm";

const App = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/students/");
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      console.error("There was an error fetching the students!", error);
    }
  };

  return (
    <div className="App">
      <h1>Student Voter List</h1>
      <UploadForm />
      <h2>Uploaded Students</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
