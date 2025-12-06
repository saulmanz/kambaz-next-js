/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Tab,
  ListGroup
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import * as client from "../../client";
import { addQuiz, updateQuiz as updateRedux } from "../../reducer";
import { BsXLg } from "react-icons/bs";
import { FIBEditor } from "./FIBEditor";
import { MCQEditor } from "./MCQEditor";
import { TFEditor } from "./TFEditor";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("details");
  const [quiz, setQuiz] = useState<any>({
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

  const [questions, setQuestions] = useState<any[]>(quiz.questions || []);
  const [editingQuestion, setEditingQuestion] = useState<{ [key: string]: any }>({});

  // Load quiz if editing
  useEffect(() => {
    if (!qid || qid === "QuizEditor") {
      setQuiz((prev: any) => ({ ...prev, _id: "", course: cid ?? prev.course }));
      setQuestions([]);
      return;
    }

    const loadQuiz = async () => {
      try {
        const q = await client.findQuizById(qid.toString());
        const loadedQuiz = {
          _id: q._id ?? "",
          title: q.title ?? "",
          course: q.course ?? cid ?? "",
          instruction: q.instruction ?? "",
          available: q.available ?? "",
          due: q.due ?? "",
          until: q.until ?? "",
          points: q.points ?? 0,
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
        };
        setQuiz(loadedQuiz);
        setQuestions(loadedQuiz.questions || []);
      } catch (err) {
        console.error("Failed to load quiz:", err);
      }
    };

    loadQuiz();
  }, [qid, cid]);

  // Update total points whenever questions change
  useEffect(() => {
    const total = questions.reduce((sum, q) => sum + (Number(q.points) || 0), 0);
    setQuiz((prev: any) => ({ ...prev, points: total }));
  }, [questions]);

  // Save quiz (create or update)
  const save = async () => {
    try {
      const quizToSave = {
        ...quiz,
        course: quiz.course || cid,
        questions
      };

      if (!qid || qid === "QuizEditor" || !quiz._id) {
        const newQuiz = await client.createQuiz(quizToSave);
        dispatch(addQuiz(newQuiz));
      } else {
        const updatedQuiz = await client.updateQuiz(quizToSave);
        dispatch(updateRedux(updatedQuiz));
      }

      router.push(`/Courses/${cid}/Quizzes`);
    } catch (err) {
      console.error("Failed to save quiz:", err);
      alert("Failed to save quiz. Check console for details.");
    }
  };

  const updateQuestion = (index: number, updates: any) => {
    setQuestions((prev) => prev.map((q, i) => (i === index ? { ...q, ...updates } : q)));
  };

  const addQuestion = () => {
    const tempId = `temp-${Date.now()}`;
    const newQuestion = {
      _id: tempId,
      name: "Question",
      question: "",
      type: "MCQ",
      points: 1,
      options: [
        { text: "Option 1", correct: false },
        { text: "Option 2", correct: false }
      ],
      answers: []
    };
    setQuestions((prev) => [...prev, newQuestion]);
    setActiveTab("questions");
  };

  const deleteQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div id="wd-assignments-editor">
      <Tabs activeKey={activeTab} onSelect={(key) => setActiveTab(key || "details")} className="mb-4">
        <Tab eventKey="details" title="Details" />
        <Tab eventKey="questions" title="Questions" />
      </Tabs>

      {/* DETAILS TAB */}
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
            <FormControl value={quiz.points} readOnly />
          </Row>
          <Row className="mb-3">
            <FormLabel column sm={2}>Quiz Type</FormLabel>
            <Col sm={10}>
              <FormControl as="select" value={quiz.type} onChange={(e) => setQuiz({ ...quiz, type: e.target.value })}>
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
              <FormControl as="select" value={quiz.group} onChange={(e) => setQuiz({ ...quiz, group: e.target.value })}>
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
              <FormCheck type="checkbox" label="Shuffle Answers" checked={quiz.shuffleAnswers} onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })} />
              <FormCheck type="checkbox" label="Multiple Attempts" checked={quiz.multipleAttempts} onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked })} />
              <FormCheck type="checkbox" label="One Question at a Time" checked={quiz.oneQuestion} onChange={(e) => setQuiz({ ...quiz, oneQuestion: e.target.checked })} />
              <FormCheck type="checkbox" label="Webcam Required" checked={quiz.webcamRequired} onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.checked })} />
              <FormCheck type="checkbox" label="Lock Questions After Answering" checked={quiz.lockQuestions} onChange={(e) => setQuiz({ ...quiz, lockQuestions: e.target.checked })} />
              <FormCheck type="checkbox" label="Show Correct Answers" checked={quiz.showCorrect} onChange={(e) => setQuiz({ ...quiz, showCorrect: e.target.checked })} />
            </Col>
            <Col sm={5}>
              <FormLabel>Time Limit (minutes)</FormLabel>
              <FormControl type="number" min={1} value={quiz.timeLimit} onChange={(e) => setQuiz({ ...quiz, timeLimit: Number(e.target.value) })} />
            </Col>
            <Col sm={5}>
              <FormLabel>Access Code</FormLabel>
              <FormControl type="text" value={quiz.accessCode} onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })} />
            </Col>
          </Row>
          <hr />
          <div className="d-flex gap-2 float-end">
            <Link href={`/Courses/${cid}/Quizzes`}><Button variant="secondary" size="lg">Cancel</Button></Link>
            <Button variant="danger" size="lg" onClick={save}>Save</Button>
          </div>
        </>
      )}

      {/* QUESTIONS TAB */}
      {activeTab === "questions" && (
        <div>
          <Button variant="primary" onClick={addQuestion}>Add Question</Button>
          <hr />
          <ListGroup>
            {questions.map((q, index) => {
              // Ensure every field exists for the editor
              const localQuestion = {
                ...q,
                ...(editingQuestion[q._id] || {}),
                options: (editingQuestion[q._id]?.options || q.options || []).map(
                  (opt: any) => ({ text: opt.text ?? "", correct: !!opt.correct })
                ),
                answers: editingQuestion[q._id]?.answers || q.answers || [],
                answer: editingQuestion[q._id]?.answer ?? q.answer ?? "True",
                name: editingQuestion[q._id]?.name ?? q.name ?? "",
                points: editingQuestion[q._id]?.points ?? q.points ?? 1,
                type: editingQuestion[q._id]?.type ?? q.type ?? "MCQ",
              };

              return (
                <ListGroup.Item key={q._id || index}>
                  <h5>Question {index + 1}</h5>
                  <Button
                    variant="danger"
                    size="sm"
                    className="float-end"
                    onClick={() => deleteQuestion(index)}
                  >
                    Delete
                  </Button>

                  <FormLabel>Question Type</FormLabel>
                  <FormControl
                    as="select"
                    value={localQuestion.type}
                    onChange={(e) =>
                      setEditingQuestion((prev) => ({
                        ...prev,
                        [q._id]: { ...localQuestion, type: e.target.value },
                      }))
                    }
                  >
                    <option value="MCQ">Multiple Choice</option>
                    <option value="TF">True / False</option>
                    <option value="FIB">Fill in the Blank</option>
                  </FormControl>
                  <br />

                  <FormLabel>Points</FormLabel>
                  <FormControl
                    type="number"
                    value={localQuestion.points}
                    onChange={(e) =>
                      setEditingQuestion((prev) => ({
                        ...prev,
                        [q._id]: { ...localQuestion, points: Number(e.target.value) },
                      }))
                    }
                  />
                  <br />

                  {localQuestion.type === "MCQ" && (
                    <MCQEditor
                      question={localQuestion}
                      index={index}
                      onChange={(i, updated) =>
                        setEditingQuestion((prev) => ({
                          ...prev,
                          [q._id]: updated,
                        }))
                      }
                    />
                  )}

                  {localQuestion.type === "TF" && (
                    <TFEditor
                      question={localQuestion}
                      index={index}
                      onChange={(i: any, updated: any) =>
                        setEditingQuestion((prev) => ({
                          ...prev,
                          [q._id]: updated,
                        }))
                      }
                    />
                  )}

                  {localQuestion.type === "FIB" && (
                    <FIBEditor
                      question={localQuestion}
                      index={index}
                      onChange={(i: any, updated: any) =>
                        setEditingQuestion((prev) => ({
                          ...prev,
                          [q._id]: updated,
                        }))
                      }
                    />
                  )}

                  <div className="d-flex gap-2 mt-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        // discard changes for this question
                        setEditingQuestion((prev) => {
                          const copy = { ...prev };
                          delete copy[q._id];
                          return copy;
                        });
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        // save changes to local questions array
                        const edited = editingQuestion[q._id];
                        if (edited) {
                          setQuestions((prev) =>
                            prev.map((item, i) => (i === index ? { ...item, ...edited } : item))
                          );
                          setEditingQuestion((prev) => {
                            const copy = { ...prev };
                            delete copy[q._id];
                            return copy;
                          });
                        }
                      }}
                    >
                      Save Question
                    </Button>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
          <hr />
          <div className="d-flex gap-2 float-end">
            <Link href={`/Courses/${cid}/Quizzes`}><Button variant="secondary" size="lg">Cancel</Button></Link>
            <Button variant="danger" size="lg" onClick={save}>Save</Button>
          </div>
        </div>
      )}
    </div>
  );
}
