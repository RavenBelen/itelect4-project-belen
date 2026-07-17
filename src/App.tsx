import "./App.css";

import { UserCard } from "./components/UserCard";
import { CourseCard } from "./components/CourseCard";
import { SubmissionCard } from "./components/SubmissionCard";

import { UserRole } from "./types";
import type { User, Course, Submission } from "./types";

function App() {
  const user: User = {
    id: 1,
    name: "Juan dela Cruz",
    email: "juan@example.com",
    role: UserRole.Student,
    isActive: true,
    score: 95.5,
  };

  const course: Course = {
    id: 101,
    name: "IT Elective 4",
    units: 3,
    semester: "1st Semester",
  };

  const submission: Submission = {
    id: 1,
    title: "GT2 Part 1",
    status: "Submitted",
  };

  const handleClick = (): void => {
    alert("Button Clicked!");
  };

  return (
    <div>
      <h1>GT2 React + TypeScript Demo</h1>

      <UserCard user={user} />

      <CourseCard course={course} />

      <SubmissionCard submission={submission} />

      <button onClick={handleClick}>
        Click Me
      </button>
    </div>
  );
}

export default App;