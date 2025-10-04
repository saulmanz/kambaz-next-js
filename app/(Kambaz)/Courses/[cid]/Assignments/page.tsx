import Link from "next/link";
import { Button, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { BsCaretDownFill } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import { BsPencilSquare } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";

/* eslint-disable @next/next/no-html-link-for-pages */
export default function Assignments() {
  return (
    <div id="wd-assignments">

      
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
          <Button variant="danger" size="lg">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Assignment
          </Button>
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

        <ListGroupItem className="wd-lesson p-3 ps-1">
          <Row className="align-items-center">
            <Col xs="auto" className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <BsPencilSquare />
            </Col>
            <Col>
              <Link href="/Courses/1234/Assignments/123"
                className="wd-assignment-link" >
                A1 - ENV + HTML
              </Link> 
              <br/>
                Multiple Modules | <b>Not available until</b> May 6 at 12:00am |  
                <b> Due</b> May 13 at 11:59pm | 100 pts
            </Col>
            <Col>
              <LessonControlButtons />
            </Col>
          </Row>
        </ListGroupItem>

          <ListGroupItem className="wd-lesson p-3 ps-1">
            <Row className="align-items-center">
              <Col xs="auto" className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <BsPencilSquare />
              </Col>
              <Col>
                <Link href="/Courses/1234/Assignments/124"
                  className="wd-assignment-link" >
                  A2 - CSS + BOOTSTRAP
                </Link> 
                <br/>
                Multiple Modules | <b>Not available until</b> May 13 at 12:00am |  
                <b> Due</b> May 20 at 11:59pm | 100 pts
              </Col>
              <Col>
                <LessonControlButtons />
              </Col>
            </Row>
          </ListGroupItem>

          <ListGroupItem className="wd-lesson p-3 ps-1">
            <Row className="align-items-center">
              <Col xs="auto" className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <BsPencilSquare />
              </Col>
              <Col>
                <Link href="/Courses/1234/Assignments/125"
                  className="wd-assignment-link" >
                  A3 - JAVASCRIPT + REACT
                </Link> 
                  <br/>
                  Multiple Modules | <b>Not available until</b> May 20 at 12:00am |  
                  <b> Due</b> May 27 at 11:59pm | 100 pts
              </Col>
              <Col>
                <LessonControlButtons />
              </Col>
            </Row>
          </ListGroupItem>

      </ListGroup>
    </div>
);}
