"use client"
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";
import Link from "next/link";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { addNewEnrollment, deleteEnrollment } from "./Enrollment/reducer";
export default function Dashboard() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const dispatch = useDispatch();

  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description"
  });
  const [isActive, setIsActive] = useState(true);
  const handleClick = () => {
    setIsActive(prev => !prev);
  };
  const [localEnrollments, setLocalEnrollments] = useState(enrollments);
  
  if (!currentUser) {
    return <div>Loading...</div>;
  }

const isUserEnrolled = (courseId: string) => {
  return enrollments.some(
    (enrollment) => enrollment.user === currentUser._id && enrollment.course === courseId
  );
};

const handleToggleEnrollment = (courseId: string) => {
  if (isUserEnrolled(courseId)) {
    const enrollmentToDelete = enrollments.find(
      (enrollment) => enrollment.user === currentUser._id && enrollment.course === courseId
    );
    if (enrollmentToDelete) {
      dispatch(deleteEnrollment(enrollmentToDelete._id));
    }
  } else {
    dispatch(addNewEnrollment({ user: currentUser._id, course: courseId }));
  }
};


  const userCourses = courses.filter((course: { _id: any; }) =>
    localEnrollments.some(
      (enrollment: { user: any; course: any; }) => enrollment.user === currentUser._id && enrollment.course === course._id
    )
  );

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard 
        <Button className="btn btn-primary float-end" onClick={handleClick}>Enrollment</Button>
      </h1>
      <hr />
      <h5>New Course
          <button className="btn btn-primary float-end"
                  id="wd-add-new-course-click"
                  onClick={() => dispatch(addNewCourse(course))} > Add </button>
        <button className="btn btn-warning float-end me-2"
                onClick={() => dispatch(updateCourse(course))} id="wd-update-course-click">
          Update </button>
      </h5><br />
      <FormControl value={course.name} className="mb-2"
             onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
      <FormControl value={course.description} rows={3}
             onChange={(e) => setCourse({ ...course, description: e.target.value }) } />

      <h2 id="wd-dashboard-published">Published Courses ({userCourses.length})</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.filter((course: { _id: any; }) =>
            enrollments.some(
            (enrollment: { user: any; course: any; }) =>      
              isActive ||
              enrollment.user === currentUser._id &&
              enrollment.course === course._id
            ))
            .map((course: { _id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <CardImg src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
                <CardBody className="d-flex flex-column">
                  <Link
                    href={`/Courses/${course._id}/Home`}
                    className="text-decoration-none text-dark mb-2"
                  >
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </CardTitle>
                  </Link>

                  <CardText
                    className="wd-dashboard-course-description overflow-hidden mb-2"
                    style={{ height: "100px" }}
                  >
                    {course.description}
                  </CardText>

                  <div className="d-flex flex-wrap gap-2">
                    <Button variant="primary" size="sm">Go</Button>
                    <Button
                      variant={isUserEnrolled(course._id) ? "danger" : "success"}
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        handleToggleEnrollment(course._id);
                      }}
                    >
                      {isUserEnrolled(course._id) ? "Unenroll" : "Enroll"}
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        setCourse(course);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(deleteCourse(course._id));
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>);}