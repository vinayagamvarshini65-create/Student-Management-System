import { useState } from "react";
import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";

function Home() {
  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    <div className="container mt-4">

      <div className="row">

        {/* Left Side - Student Form */}
        <div className="col-lg-4 mb-4">
          <div className="dashboard-card">
            <StudentForm
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
            />
          </div>
        </div>

        {/* Right Side - Student List */}
        <div className="col-lg-8">
          <div className="dashboard-card">
            <StudentList
              setSelectedStudent={setSelectedStudent}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;