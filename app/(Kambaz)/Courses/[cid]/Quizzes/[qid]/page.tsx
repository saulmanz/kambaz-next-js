/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Button,
  Col,
  Row,
  Card
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import * as client from "../client";

interface Quiz {
  _id: string;
  title: string;
  instruction: string;
  points: number;
  type: string;
  group: string;
  questionTotal: number;
  shuffleAnswers: boolean;
  multipleAttempts: boolean;
  oneQuestion: boolean;
  webcamRequired: boolean;
  lockQuestions: boolean;
  showCorrect: boolean;
  timeLimit: number;
  accessCode: string;
  available: string;
  due: string;
  until: string;
  questions: string[]
}

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const role = currentUser?.role?.toUpperCase();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!qid) {
      setQuiz((prev: any) => ({ ...prev, _id: "", course: cid ?? prev.course }));
      return;
    }

    const loadQuiz = async () => {
      try {
        const q = await client.findQuizById(qid.toString());
        setQuiz(q);
        
        // Redirect students directly to Preview/Take Quiz page
        if (role === "STUDENT") {
          router.push(`/Courses/${cid}/Quizzes/${qid}/Preview`);
        }
      } catch (err) {
        console.error("Failed to load quiz:", err);
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [qid, cid, role, router]);

  if (loading) {
    return <div>Loading quiz details...</div>;
  }

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not set";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  return (
    <div id="wd-quiz-details">
      <hr />
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{quiz.title || "Untitled Quiz"}</h2>
        <div className="d-flex gap-2">
          <Link href={`/Courses/${cid}/Quizzes/${qid}/Preview`}>
            <Button variant="outline-primary">Preview</Button>
          </Link>
          <Link href={`/Courses/${cid}/Quizzes/${qid}/Editor`}>
            <Button variant="primary">Edit</Button>
          </Link>
        </div>
      </div>

      <Card className="mb-3">
        <Card.Body>
          <h5 className="mb-3">Quiz Information</h5>
          
          <Row className="mb-2">
            <Col sm={3}><strong>Quiz Title:</strong></Col>
            <Col sm={9}>{quiz.title || "Not set"}</Col>
          </Row>

          <Row className="mb-2">
            <Col sm={3}><strong>Quiz Instructions:</strong></Col>
            <Col sm={9}>
              <div style={{ whiteSpace: "pre-wrap" }}>
                {quiz.instruction || "No instructions provided"}
              </div>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col sm={3}><strong>Points Total:</strong></Col>
            <Col sm={9}>{quiz.points || 0} points</Col>
          </Row>

          <Row className="mb-2">
            <Col sm={3}><strong>Quiz Type:</strong></Col>
            <Col sm={9}>{quiz.type || "Not set"}</Col>
          </Row>

          <Row className="mb-2">
            <Col sm={3}><strong>Assignment Group:</strong></Col>
            <Col sm={9}>{quiz.group || "Not set"}</Col>
          </Row>

          <Row className="mb-2">
            <Col sm={3}><strong>Number of Questions:</strong></Col>
            <Col sm={9}>{quiz.questionTotal || 0}</Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Body>
          <h5 className="mb-3">Options</h5>
          
          <Row className="mb-2">
            <Col sm={6}>
              <div>Shuffle Answers: {quiz.shuffleAnswers ? "Yes" : "No"}</div>
            </Col>
            <Col sm={6}>
              <div>Multiple Attempts: {quiz.multipleAttempts ? "Yes" : "No"}</div>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col sm={6}>
              <div>One Question at a Time: {quiz.oneQuestion ? "Yes" : "No"}</div>
            </Col>
            <Col sm={6}>
              <div>Webcam Required: {quiz.webcamRequired ? "Yes" : "No"}</div>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col sm={6}>
              <div>Lock Questions After Answering: {quiz.lockQuestions ? "Yes" : "No"}</div>
            </Col>
            <Col sm={6}>
              <div>Show Correct Answers: {quiz.showCorrect ? "Yes" : "No"}</div>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col sm={6}>
              <div><strong>Time Limit:</strong> {quiz.timeLimit || 0} minutes</div>
            </Col>
            <Col sm={6}>
              <div><strong>Access Code:</strong> {quiz.accessCode || "None"}</div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Body>
          <h5 className="mb-3">Availability</h5>
          
          <Row className="mb-2">
            <Col sm={3}><strong>Available From:</strong></Col>
            <Col sm={9}>{formatDate(quiz.available)}</Col>
          </Row>

          <Row className="mb-2">
            <Col sm={3}><strong>Due Date:</strong></Col>
            <Col sm={9}>{formatDate(quiz.due)}</Col>
          </Row>

          <Row className="mb-2">
            <Col sm={3}><strong>Until:</strong></Col>
            <Col sm={9}>{formatDate(quiz.until)}</Col>
          </Row>
        </Card.Body>
      </Card>

      <div className="mt-4">
        <Link href={`/Courses/${cid}/Quizzes`}>
          <Button variant="secondary">Back to Quizzes</Button>
        </Link>
      </div>
    </div>
  );
}
