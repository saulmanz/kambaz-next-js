"use client"
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { BsGripVertical, BsCaretDownFill, BsPencilSquare } from "react-icons/bs";
import { FaPlus, FaSearch } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import LessonControlButtons from "./LessonControlButtons";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";

interface Assignment {
  _id: string;
  title: string;
  course: string;
  available: string;
  due: string;
  points: number;
}

interface AssignmentState {
  assignments: Assignment[];
}

interface RootState {
  assignmentReducer: AssignmentState;
}

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();

  const { assignments } = useSelector((state: RootState) => state.assignmentReducer);

  return (
    <div id="wd-assignments">
      <hr />
      <div className="d-flex align-items-center justify-content-between" style={{ maxWidth: "100%" }}>
        <div className="input-group rounded overflow-hidden" style={{ maxWidth: "500px", flexGrow: 1 }}>
          <span className="input-group-text bg-white border-end-0">
            <FaSearch />
          </span>
          <input
            type="search"
            className="form-control border-start-0"
            placeholder="Search..."
          />
        </div>

        <div className="d-flex gap-2 ms-3">
          <Button variant="secondary" size="lg">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Group
          </Button>
          <Link href={`/Courses/${cid}/Assignments/AssignmentEditor`} className="wd-assignment-link">
            <Button variant="danger" size="lg">
              <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
              Assignment
            </Button>
          </Link>
        </div>
      </div>

      <ListGroup className="rounded-0 mt-5" id="wd-modules">
        <ListGroupItem className="wd-title p-3 ps-2 bg-secondary rounded-0">
          <h4 className="mb-0 d-flex align-items-center justify-content-between">
            <span>
              <BsGripVertical className="me-2 fs-3" />
              <BsCaretDownFill size={14} /> ASSIGNMENTS
            </span>
            <span className="d-flex align-items-center gap-2">
              <span className="border rounded-pill px-3 py-1">40% Total</span>
              <Button variant="secondary" size="sm">
                <FaPlus />
              </Button>
              <IoEllipsisVertical className="fs-4" />
            </span>
          </h4>
        </ListGroupItem>

        {assignments
          .filter((assignment: Assignment) => assignment.course === cid)
          .map((assignment: Assignment) => (
            <ListGroupItem key={assignment._id} className="wd-module p-0 fs-5 border-gray">
              <Row className="align-items-center">
                <Col xs="auto" className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <BsPencilSquare />
                </Col>
                <Col>
                  <Link
                    href={`/Courses/${cid}/Assignments/${assignment._id}`}
                    className="wd-assignment-link"
                  >
                    {assignment.title}
                  </Link>
                  <br />
                  Multiple Modules | <b>Not available until</b> {assignment.available} |  
                  <b> Due</b> {assignment.due} | {assignment.points} pts
                </Col>
                <Col>
                  <LessonControlButtons 
                    assignmentID={assignment._id}
                    deleteAssignment={(assignmentID: string) => {
                      dispatch(deleteAssignment(assignmentID));
                    }}
                  />
                </Col>
              </Row>
            </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
