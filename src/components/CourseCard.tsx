import type { Course } from "../types";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div>
      <h2>Course Information</h2>
      <p>ID: {course.id}</p>
      <p>Name: {course.name}</p>
      <p>Units: {course.units}</p>
      <p>Semester: {course.semester}</p>
    </div>
  );
}

export default CourseCard;