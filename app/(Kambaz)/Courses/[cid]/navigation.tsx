import Link from "next/link";
export default function CourseNavigation() {
  return (
    <div id="wd-courses-navigation">
      <Link href="/Courses/1234/Home" id="wd-course-home-link">Home</Link><br/>
      <Link href="/Courses/1234/Modules" id="wd-course-modules-link">Modules
        </Link><br/>
      <Link href="https://piazza.com/class/mf1li76n4is6m" id="wd-course-piazza-link">Piazza</Link><br/>
      <Link href="https://northeastern.zoom.us/j/91715201811#success" id="wd-course-zoom-link">Zoom</Link><br/>
      <Link href="/Courses/1234/Assignments" id="wd-course-quizzes-link">
          Assignments</Link><br/>
      <Link href="https://northeastern.instructure.com/courses/225902/quizzes" id="wd-course-assignments-link">Quizzes
        </Link><br/>
      <Link href="https://northeastern.instructure.com/courses/225902/grades" id="wd-course-grades-link">Grades</Link><br/>
      <Link href="/Courses/1234/People/Table" id="wd-course-people-link">People</Link><br/>
    </div>
  );}
