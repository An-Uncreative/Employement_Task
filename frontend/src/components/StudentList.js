import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentList = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const response = await axios.get("http://localhost:8000/api/students/");
    setStudents(response.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.student_id}>
            <td>{student.student_id}</td>
            <td>{student.first_name}</td>
            <td>{student.last_name}</td>
            <td>{student.email}</td>
            <td>{student.department}</td>
            <td>{student.year}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentList;
