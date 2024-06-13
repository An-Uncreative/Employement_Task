// src/UploadForm.js

import React, { useState } from "react";
import axios from "axios";

const UploadForm = ({ fetchStudents }) => {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);

    try {
      await axios.post("http://localhost:8000/api/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("File uploaded successfully!");
      fetchStudents(); // Fetch updated list of students
    } catch (error) {
      console.error("There was an error uploading the file!", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div>
        <label>File:</label>
        <input type="file" onChange={handleFileChange} required />
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
