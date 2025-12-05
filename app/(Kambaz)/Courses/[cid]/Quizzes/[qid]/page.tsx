"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Button,
  Col,
  FormCheck,
  FormControl,
  FormLabel,
  InputGroup,
  Row,
  Tabs,
  Tab
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as client from "../client";
import { addQuiz, updateQuiz as updateRedux } from "../reducer";
import { BsXLg } from "react-icons/bs";
import { setQuestions } from "./reducer";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("details");
  const { questions } = useSelector((state: any) => state.questionReducer);

  const [quiz, setQuiz] = useState({
    _id: qid ?? "",
    title: "",
    course: cid ?? "",
    instruction: "",
    available: "",
    due: "",
    until: "",
    points: 100,
    type: "Graded Quiz",
    group: "Quizzes",
    shuffleAnswers: true,
    multipleAttempts: false,
    oneQuestion: false,
    webcamRequired: false,
    lockQuestions: false,
    showCorrect: false,
    timeLimit: 20,
    accessCode: "",
    questionTotal: 100,
    studentScores: [],
    questions: []
  });

  useEffect(() => {
    if (!qid) return;

    const loadQuiz = async () => {
      const q = await client.findQuizById(qid.toString());
      setQuiz({
        _id: q._id ?? "",
        title: q.title ?? "",
        course: q.course ?? cid ?? "",
        instruction: q.instruction ?? "",
        available: q.available ?? "",
        due: q.due ?? "",
        until: q.until ?? "",
        points: q.points ?? 100,
        type: q.type ?? "Graded Quiz",
        group: q.group ?? "Quizzes",
        shuffleAnswers: q.shuffleAnswers ?? true,
        multipleAttempts: q.multipleAttempts ?? false,
        oneQuestion: q.oneQuestion ?? false,
        webcamRequired: q.webcamRequired ?? false,
        lockQuestions: q.lockQuestions ?? false,
        showCorrect: q.showCorrect ?? false,
        timeLimit: q.timeLimit ?? 20,
        accessCode: q.accessCode ?? "",
        questionTotal: q.questionTotal ?? 100,
        studentScores: q.studentScores ?? [],
        questions: q.questions ?? []
      });
    };

    loadQuiz();
  }, [qid, cid]);

  const save = async () => {
    try {
      if (!qid) {
        const newQuiz = await client.createQuiz(quiz);
        dispatch(addQuiz(newQuiz));
      } else {
        const updatedQuiz = await client.updateQuiz(quiz);
        dispatch(updateRedux(updatedQuiz));
      }
      router.push(`/Courses/${cid}/Quizzes`);
    } catch (err) {
      console.error("Failed to save quiz:", err);
      alert("Failed to save quiz. Check console for details.");
    }
  };

  const addQuestion = async () => {
    try {
      const newQuestion = await client.createQuestion(
        cid as string,
        qid as string,
        { name: "Question", type: "MCQ" }
      );
      dispatch(setQuestions([...questions, newQuestion]));
    } catch (err) {
      console.error("Failed to add question:", err);
      alert("Failed to add question. Check console for details.");
    }
  };

  return (
    <div id="wd-assignments-editor">

      <Tabs
        activeKey={activeTab}
        onSelect={(key) => setActiveTab(key || "details")}
        className="mb-4"
      >
        <Tab eventKey="details" title="Details" />
        <Tab eventKey="questions" title="Questions" />
      </Tabs>

      {/* ------------------ DETAILS TAB CONTENT ------------------ */}
      {activeTab === "details" && (
        <>
          <FormLabel>Quiz Title</FormLabel>
          <FormControl
            as="textarea"
            rows={1}
            value={quiz.title}
            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
          />
          <br />

          <FormLabel>Quiz Instructions</FormLabel>
          <FormControl
            as="textarea"
            rows={6}
            value={quiz.instruction}
            onChange={(e) => setQuiz({ ...quiz, instruction: e.target.value })}
          />
          <br />

          <Row className="mb-3">
            <FormLabel column sm={2}>Points Total</FormLabel>
            <Col sm={10}>{quiz.points}</Col>
          </Row>

          <Row className="mb-3">
            <FormLabel column sm={2}>Quiz Type</FormLabel>
            <Col sm={10}>
              <FormControl
                as="select"
                value={quiz.type}
                onChange={(e) => setQuiz({ ...quiz, type: e.target.value })}
              >
                <option value="Graded Quiz">Graded Quiz</option>
                <option value="Practice Quiz">Practice Quiz</option>
                <option value="Graded Survey">Graded Survey</option>
                <option value="Ungraded Survey">Ungraded Survey</option>
              </FormControl>
            </Col>
          </Row>

          <Row className="mb-3">
            <FormLabel column sm={2}>Assignment Group</FormLabel>
            <Col sm={10}>
              <FormControl
                as="select"
                value={quiz.group}
                onChange={(e) => setQuiz({ ...quiz, group: e.target.value })}
              >
                <option value="Quizzes">Quizzes</option>
                <option value="Exams">Exams</option>
                <option value="Assignments">Assignments</option>
                <option value="Project">Project</option>
              </FormControl>
            </Col>
          </Row>

          <Row className="mb-3">
            <FormLabel column sm={2}>Options</FormLabel>
            <Col>
              <FormCheck
                type="checkbox"
                label="Shuffle Answers"
                checked={quiz.shuffleAnswers}
                onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })}
              />
              <FormCheck
                type="checkbox"
                label="Multiple Attempts"
                checked={quiz.multipleAttempts}
                onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked })}
              />
              <FormCheck
                type="checkbox"
                label="One Question at a Time"
                checked={quiz.oneQuestion}
                onChange={(e) => setQuiz({ ...quiz, oneQuestion: e.target.checked })}
              />
              <FormCheck
                type="checkbox"
                label="Webcam Required"
                checked={quiz.webcamRequired}
                onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.checked })}
              />
              <FormCheck
                type="checkbox"
                label="Lock Questions After Answering"
                checked={quiz.lockQuestions}
                onChange={(e) => setQuiz({ ...quiz, lockQuestions: e.target.checked })}
              />
              <FormCheck
                type="checkbox"
                label="Show Correct Answers"
                checked={quiz.showCorrect}
                onChange={(e) => setQuiz({ ...quiz, showCorrect: e.target.checked })}
              />
            </Col>

            <Col sm={5}>
              <FormLabel>Time Limit (minutes)</FormLabel>
              <FormControl
                type="number"
                min={1}
                value={quiz.timeLimit}
                onChange={(e) => setQuiz({ ...quiz, timeLimit: Number(e.target.value) })}
              />
            </Col>

            <Col sm={5}>
              <FormLabel>Access Code</FormLabel>
              <FormControl
                type="text"
                value={quiz.accessCode}
                onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
              />
            </Col>
          </Row>

          <Row className="mb-2" name="due-date">
            <FormLabel column sm={2}> Assign </FormLabel>
            <Col sm={10}>
              <div className="border p-3">
                <FormLabel column sm={2}> Assign </FormLabel>
                <div className="border p-4">
                  <div className="d-inline-flex align-items-center bg-light text-dark rounded-pill px-3 py-1" style={{ cursor: "pointer" }}>
                    <span className="me-2">Everyone</span>
                    <BsXLg />
                  </div>
                </div>

                <FormLabel column sm={2}> Due </FormLabel>
                <InputGroup>
                  <input
                    type="date"
                    className="form-control"
                    value={quiz.due}
                    onChange={(e) => setQuiz({ ...quiz, due: e.target.value })}
                  />
                </InputGroup>

                <Row>
                  <Col>
                    <FormLabel column sm={3}> Available From </FormLabel>
                    <InputGroup>
                      <input
                        type="date"
                        className="form-control"
                        value={quiz.available}
                        onChange={(e) => setQuiz({ ...quiz, available: e.target.value })}
                      />
                    </InputGroup>
                  </Col>

                  <Col>
                    <FormLabel column sm={2}> Until </FormLabel>
                    <InputGroup>
                      <input
                        type="date"
                        className="form-control"
                        value={quiz.until}
                        onChange={(e) => setQuiz({ ...quiz, until: e.target.value })}
                      />
                    </InputGroup>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

          <hr />

          <div className="d-flex gap-2 float-end">
            <Link href={`/Courses/${cid}/Quizzes`}>
              <Button variant="secondary" size="lg">Cancel</Button>
            </Link>

            <Button variant="danger" size="lg" onClick={save}>
              Save
            </Button>
          </div>
        </>
      )}

      {/* ------------------ QUESTIONS TAB CONTENT ------------------ */}
      {activeTab === "questions" && (
        <div>
          <Button variant="primary" onClick={addQuestion}>Add Question</Button>
        </div>
      )}
    </div>
  );
}
