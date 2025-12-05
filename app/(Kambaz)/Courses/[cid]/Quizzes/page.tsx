/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { BsGripVertical, BsCaretDownFill, BsPencilSquare } from "react-icons/bs";
import { FaPlus, FaSearch } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import LessonControlButtons from "./LessonControlButtons";
import { useSelector, useDispatch } from "react-redux";
import { deleteQuiz, setQuiz } from "./reducer";
import * as client from "./client";
import { useEffect } from "react";

export default function Quizzes() {
  const { cid } = useParams();
  const dispatch = useDispatch();

  const { quizzes } = useSelector((state: any) => state.quizReducer);

  console.log(quizzes)

  useEffect(() => {
    const loadQuizzes = async () => {
      const serverQuizzes = await client.findQuizzesForCourse(cid as string);
      dispatch(setQuiz(serverQuizzes));
    };
    loadQuizzes();
  }, [cid, dispatch]);

  return (
    <div id="wd-quizzes">
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
          <Link href={`/Courses/${cid}/Quizzes/QuizEditor`} className="wd-assignment-link">
            <Button variant="danger" size="lg">
              <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
              Quiz
            </Button>
          </Link>
          <Button variant="secondary">
              <IoEllipsisVertical className="fs-4" />
          </Button>
        </div>
      </div>

      <ListGroup className="rounded-0 mt-5" id="wd-modules">
        <ListGroupItem className="wd-title p-3 ps-2 bg-secondary rounded-0">
          <h4 className="mb-0 d-flex align-items-center justify-content-between">
            <span>
              <BsGripVertical className="me-2 fs-3" />
              <BsCaretDownFill size={14} /> Assignment Quizzes
            </span>
            <span className="d-flex align-items-center gap-2">
              <IoEllipsisVertical className="fs-4" />
            </span>
          </h4>
        </ListGroupItem>

        {quizzes
          .map((quiz: any) => (
            <ListGroupItem key={quiz._id} className="wd-module p-0 fs-5 border-gray">
              <Row className="align-items-center">
                <Col xs="auto" className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <BsPencilSquare />
                </Col>
                <Col>
                  <Link
                    href={`/Courses/${cid}/Quizzes/${quiz._id}`}
                    className="wd-quiz-link"
                  >
                    {quiz.title}
                  </Link>
                  <br />
                    Multiple Modules | <b>Not available until</b> {quiz.available} |  
                    <b> Due</b> {quiz.due} | {quiz.points} pts | {quiz.questionTotal} Questions
                </Col>
                <Col>
                  <LessonControlButtons 
                    quizID={quiz._id}
                    deleteQuiz={async (quizID: string) => {
                      try {
                        await client.deleteQuiz(quizID);
                        dispatch(deleteQuiz(quizID));
                      } catch (err) {
                        console.error(err);
                      }
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
