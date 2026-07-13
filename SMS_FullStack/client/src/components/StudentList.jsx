import { useState, useEffect } from "react";
import { getStudents, deleteStudent } from "../services/studentService";

function StudentList({ setSelectedStudent }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  // Fetch Students
  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Load Students
  useEffect(() => {
    fetchStudents();
  }, []);

  // Delete Student
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await deleteStudent(id);

      alert("Student Deleted Successfully");

      fetchStudents();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  // Search + Filter
  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesDepartment =
      departmentFilter === "All" ||
      student.department === departmentFilter;

    const matchesYear =
      yearFilter === "All" ||
      String(student.year) === yearFilter;

    return matchesSearch && matchesDepartment && matchesYear;
  });

  // Pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const totalPages = Math.ceil(
    filteredStudents.length / studentsPerPage
  );

  // Dashboard Stats
  const totalStudents = students.length;

  const totalDepartments = new Set(
    students.map((student) => student.department)
  ).size;

  const finalYearStudents = students.filter(
    (student) => Number(student.year) === 4
  ).length;

  return (
    <div>
      <h2>Student List</h2>

      {/* Dashboard Stats */}

      <div className="stats-container">
        <div className="stat-card">
          <h3>👨‍🎓</h3>
          <h4>{totalStudents}</h4>
          <p>Total Students</p>
        </div>

        <div className="stat-card">
          <h3>🏫</h3>
          <h4>{totalDepartments}</h4>
          <p>Departments</p>
        </div>

        <div className="stat-card">
          <h3>🎓</h3>
          <h4>{finalYearStudents}</h4>
          <p>Final Year</p>
        </div>
      </div>

      {loading && <h3>Loading Students...</h3>}

      {/* Search + Filter */}

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search Student..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          className="filter-select"
          value={departmentFilter}
          onChange={(e) => {
            setDepartmentFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="All">All Departments</option>
          <option value="B.Sc IT">B.Sc IT</option>
          <option value="B.Sc ITDS">B.Sc ITDS</option>
          <option value="BCA">BCA</option>
          <option value="MCA">MCA</option>
        </select>

        <select
          className="filter-select"
          value={yearFilter}
          onChange={(e) => {
            setYearFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="All">All Years</option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>
      </div>

      {!loading && filteredStudents.length === 0 && (
        <h3>No Students Found</h3>
      )}

      {/* Student Cards */}

      {currentStudents.map((student) => (
        <div key={student._id} className="student-card">
          <h4>{student.name}</h4>

          <p><strong>Email:</strong> {student.email}</p>

          <p><strong>Roll No:</strong> {student.rollNumber}</p>

          <p><strong>Department:</strong> {student.department}</p>

          <p><strong>Year:</strong> {student.year}</p>

          <p><strong>Phone:</strong> {student.phone}</p>

          <div className="button-group">
            <button
              className="edit-btn"
              onClick={() => setSelectedStudent(student)}
            >
              ✏ Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => handleDelete(student._id)}
            >
              🗑 Delete
            </button>
          </div>

          <hr />
        </div>
      ))}

      {/* Pagination */}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ◀ Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={
                currentPage === index + 1 ? "active-page" : ""
              }
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
}

export default StudentList;