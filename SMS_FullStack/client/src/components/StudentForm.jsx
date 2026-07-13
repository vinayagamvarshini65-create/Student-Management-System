import { useState, useEffect } from "react";
import { addStudent, updateStudent } from "../services/studentService";


function StudentForm({ selectedStudent, setSelectedStudent }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNumber: "",
    department: "",
    year: "",
    phone: "",
  });

  // Fill form when Edit button is clicked
  useEffect(() => {
    if (selectedStudent) {
      setFormData({
        name: selectedStudent.name,
        email: selectedStudent.email,
        rollNumber: selectedStudent.rollNumber,
        department: selectedStudent.department,
        year: selectedStudent.year,
        phone: selectedStudent.phone,
      });
    }
  }, [selectedStudent]);

  // Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add or update student
const handleSubmit = async (e) => {
  e.preventDefault();

  // Name
if (formData.name.trim() === "") {
  alert("Name is required");
  return;
}

// Email
if (!formData.email.includes("@")) {
  alert("Enter a valid email");
  return;
}

// Roll Number
if (formData.rollNumber.trim() === "") {
  alert("Roll Number is required");
  return;
}

// Department
if (formData.department.trim() === "") {
  alert("Department is required");
  return;
}

// Year
if (
  formData.year === "" ||
  Number(formData.year) < 1 ||
  Number(formData.year) > 4
) {
  alert("Year must be between 1 and 4");
  return;
}

// Phone
if (!/^\d{10}$/.test(formData.phone)) {
  alert("Phone number must be exactly 10 digits");
  return;
}

  try {
    if (selectedStudent) {
      await updateStudent(selectedStudent._id, formData);

      alert("Student Updated Successfully");
    } else {
      await addStudent(formData);

      alert("Student Added Successfully");
    }

    setFormData({
      name: "",
      email: "",
      rollNumber: "",
      department: "",
      year: "",
      phone: "",
    });

    setSelectedStudent(null);

  } catch (error) {
    console.error(error);
    alert("Operation Failed");
  }
};

  return (
    <div>
      <h2 className="form-title">
        {selectedStudent ? "✏ Edit Student" : "➕ Add Student"}
        </h2>

      <form onSubmit={handleSubmit} className="student-form">

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
        />


        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="rollNumber"
          placeholder="Enter Roll Number"
          value={formData.rollNumber}
          onChange={handleChange}
        />


        <input
          type="text"
          name="department"
          placeholder="Enter Department"
          value={formData.department}
          onChange={handleChange}
        />


        <input
          type="number"
          name="year"
          placeholder="Enter Year"
          value={formData.year}
          onChange={handleChange}
        />


        <input
          type="text"
          name="phone"
          placeholder="Enter Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />


        <button type="submit" className="submit-btn">
          {selectedStudent ? "Update Student" : "Add Student"}
          </button>

      </form>
    </div>
  );
}

export default StudentForm;