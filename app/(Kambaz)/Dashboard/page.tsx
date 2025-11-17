"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse, setCourses } from "../Courses/reducer";
import { addNewEnrollment, deleteEnrollment } from "./Enrollment/reducer";
import * as client from "../Courses/client";

interface Course {
  _id: string;
  name: string;
  number?: string;
  startDate?: string;
  endDate?: string;
  image?: string;
  description?: string;
}

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface User {
  _id: string;
  name?: string;
  email?: string;
}

interface RootState {
  accountReducer: { currentUser: User | null };
  enrollmentReducer: { enrollments: Enrollment[] };
  coursesReducer: { courses: Course[] };
}

export default function Dashboard() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentReducer);
  const { courses } = useSelector((state: RootState) => state.coursesReducer);

  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const [isEnrollmentView, setIsEnrollmentView] = useState(false);

  const fetchCourses = async () => {
    try {
      const allCourses = await client.findMyCourses();
      dispatch(setCourses(allCourses));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [currentUser]);

  if (!currentUser) return <div>Loading...</div>;

  const toggleEnrollmentView = () => setIsEnrollmentView(prev => !prev);

  const handleToggleEnrollment = (courseId: string) => {
    const enrollment = enrollments.find(e => e.user === currentUser._id && e.course === courseId);
    if (enrollment) dispatch(deleteEnrollment(enrollment._id));
    else dispatch(addNewEnrollment({ user: currentUser._id, course: courseId }));
  };

  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c) => c._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(setCourses(courses.map(c => c._id === course._id ? course : c)));
  };

  const userCourses = courses.filter(c =>
    enrollments.some(e => e.user === currentUser._id && e.course === c._id)
  );

  const displayedCourses = isEnrollmentView ? courses : userCourses;

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        <Button className="btn btn-primary float-end" onClick={toggleEnrollmentView}>
          {isEnrollmentView ? "Back to My Courses" : "Enrollment"}
        </Button>
      </h1>
      <hr />

      {!isEnrollmentView && (
        <>
          <h5>
            New Course
            <Button className="btn btn-primary float-end" onClick={onAddNewCourse}>
              Add
            </Button>
            <Button className="btn btn-secondary float-end" onClick={onUpdateCourse}>
              Update
            </Button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={e => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            rows={3}
            value={course.description}
            onChange={e => setCourse({ ...course, description: e.target.value })}
          />
          <h2 id="wd-dashboard-published">Published Courses ({userCourses.length})</h2>
        </>
      )}

      {isEnrollmentView && <h2>All Courses</h2>}

      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map(c => {
            const enrolled = enrollments.some(e => e.user === currentUser._id && e.course === c._id);

            return (
              <Col key={c._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                  <CardImg src={c.image || "/images/reactjs.jpg"} variant="top" width="100%" height={160} />
                  <CardBody className="d-flex flex-column">
                    <Link href={`/Courses/${c._id}/Home`} className="text-decoration-none text-dark mb-2">
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {c.name}
                      </CardTitle>
                    </Link>
                    <CardText className="wd-dashboard-course-description overflow-hidden mb-2" style={{ height: "100px" }}>
                      {c.description}
                    </CardText>

                    <div className="d-flex flex-wrap gap-2">
                      <Link href={`/Courses/${c._id}/Home`}>
                        <Button variant="primary" size="sm">Go</Button>
                      </Link>
                      <Button
                        variant={enrolled ? "danger" : "success"}
                        size="sm"
                        onClick={e => {
                          e.preventDefault();
                          handleToggleEnrollment(c._id);
                        }}
                      >
                        {enrolled ? "Unenroll" : "Enroll"}
                      </Button>
                      {!isEnrollmentView && (
                        <>
                          <Button
                            variant="warning"
                            size="sm"
                            onClick={e => {
                              e.preventDefault();
                              setCourse({ ...c });
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={e => {
                              e.preventDefault();
                              onDeleteCourse(c._id);
                            }}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
