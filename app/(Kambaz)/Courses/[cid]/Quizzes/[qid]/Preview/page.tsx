/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  Button, 
  Card, 
  FormCheck, 
  FormControl, 
  Alert,
  Badge
} from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import * as client from "../../client";

interface Question {
  _id: string;
  name: string;
  type: string;
  points: number;
  options?: Array<{ text: string; correct: boolean }>;
  answer?: string;
  answers?: { blankText?: string; correctAnswers: string[] }[];
  question?: string
}

interface StudentScore {
  studentId: number | string;
  lastScore: number;
  attempt: number;
  answers?: { [key: string]: any };
}

interface Quiz {
  _id: string;
  title: string;
  instruction: string;
  points: number;
  timeLimit: number;
  showCorrect: boolean;
  multipleAttempts: boolean;
  maxAttempts: number | null;
  questions: Question[];
  studentScores?: StudentScore[];
}

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const role = currentUser?.role?.toUpperCase();
  const isPreview = role !== "STUDENT";

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [studentScore, setStudentScore] = useState<StudentScore | null>(null);
  const [hasTakenQuiz, setHasTakenQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Load quiz
  useEffect(() => {
    if (!qid) return;
    const loadQuiz = async () => {
      try {
        const q = await client.findQuizById(qid.toString());
        setQuiz(q);

        // Check if student has already taken this quiz
        let quizTaken = false;
        if (role === "STUDENT" && currentUser && q.studentScores) {
          const studentScoreEntry = q.studentScores.find(
            (s: StudentScore) => String(s.studentId) === String(currentUser._id)
          );
          if (studentScoreEntry) {
            setStudentScore(studentScoreEntry);
            quizTaken = true;
            setHasTakenQuiz(true);
            setSubmitted(true);
            setScore(q.points > 0 ? (studentScoreEntry.lastScore / q.points) * 100 : 0);
            if (studentScoreEntry.answers) setAnswers(studentScoreEntry.answers);
          }
        }

        if (q.timeLimit && !isPreview && !quizTaken && q.questions?.length) {
          setTimeRemaining(q.timeLimit * 60);
        }
      } catch (err) {
        console.error("Failed to load quiz:", err);
      } finally {
        setLoading(false);
      }
    };
    loadQuiz();
  }, [qid, role, currentUser, isPreview]);

  // FIB grading: all blanks must match
  const isFIBCorrect = (question: Question): boolean => {
    const userAnswersForQuestion = Array.isArray(answers[question._id]) ? answers[question._id] : [];
    return question.answers?.every((blank, idx) => {
      const userAns = String(userAnswersForQuestion[idx] || "").toLowerCase().trim();
      return blank.correctAnswers.some(ans => ans.toLowerCase().trim() === userAns);
    }) ?? false;
  };

  const isQuestionCorrect = useCallback((question: Question): boolean => {
    const userAnswer = answers[question._id];
    if (question.type === "MCQ" && question.options) {
      const correctIndices = question.options.map((o, i) => o.correct ? i : -1).filter(i => i !== -1);
      const userSelections = Array.isArray(userAnswer) ? userAnswer : (userAnswer !== undefined ? [userAnswer] : []);
      return correctIndices.length === userSelections.filter((i: number) => correctIndices.includes(i)).length &&
             userSelections.filter((i: number) => !correctIndices.includes(i)).length === 0;
    }
    if (question.type === "TF" && question.answer) {
      return userAnswer === question.answer;
    }
    if (question.type === "FIB") {
      return isFIBCorrect(question);
    }
    return false;
  }, [answers]);

  const calculateScore = useCallback(() => {
    if (!quiz) return { earnedPoints: 0, totalPoints: 0 };
    let earnedPoints = 0, totalPoints = 0;
    quiz.questions.forEach(q => {
      totalPoints += q.points || 0;
      if (isQuestionCorrect(q)) earnedPoints += q.points || 0;
    });
    return { earnedPoints, totalPoints };
  }, [quiz, isQuestionCorrect]);

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleMCQAnswerChange = (questionId: string, optionIndex: number) => {
    setAnswers(prev => {
      const selections = Array.isArray(prev[questionId]) ? prev[questionId] : (prev[questionId] !== undefined ? [prev[questionId]] : []);
      const updated = selections.includes(optionIndex) ? selections.filter(i => i !== optionIndex) : [...selections, optionIndex];
      return { ...prev, [questionId]: updated };
    });
  };

  const handleSubmit = async () => {
    if (submitted) return;
    setSubmitted(true);
    const { earnedPoints, totalPoints } = calculateScore();
    setScore(totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0);

    if (isPreview) return;

    if (currentUser && qid && role === "STUDENT") {
      try {
        await client.submitQuizScore(qid.toString(), currentUser._id, earnedPoints, answers);
        const updatedQuiz = await client.findQuizById(qid.toString());
        setQuiz(updatedQuiz);
        setHasTakenQuiz(true);
      } catch (err) {
        console.error("Failed to submit quiz score:", err);
        alert("Failed to save quiz score. Try again.");
        setSubmitted(false);
      }
    }
  };

  const canRetakeQuiz = () => {
    if (isPreview || !quiz?.multipleAttempts || !studentScore) return false;
    if (quiz.maxAttempts === null || quiz.maxAttempts === undefined) return true;
    return (studentScore.attempt || 0) < quiz.maxAttempts;
  };

  if (loading) return <div>Loading quiz...</div>;
  if (!quiz) return <div>Quiz not found</div>;

  const questions = quiz.questions || [];
  const question = questions[currentQuestionIndex];

  return (
    <div id="wd-quiz-preview">
      <h2>{quiz.title}</h2>
      {quiz.instruction && <Card className="mb-4"><Card.Body>{quiz.instruction}</Card.Body></Card>}
      {timeRemaining !== null && !isPreview && <Badge bg="info">Time: {Math.floor(timeRemaining/60)}:{(timeRemaining%60).toString().padStart(2,"0")}</Badge>}

      {/* Jump-to-question navigation */}
      <div className="mb-3">
        <strong>Jump to question:</strong>{" "}
        {questions.map((_, idx) => (
          <Button
            key={idx}
            size="sm"
            variant={currentQuestionIndex === idx ? "primary" : "outline-primary"}
            className="me-1 mb-1"
            onClick={() => setCurrentQuestionIndex(idx)}
          >
            {idx + 1}
          </Button>
        ))}
      </div>

      {question && (
        <Card className="mb-3">
          <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <strong>Q{currentQuestionIndex + 1}: {question.name}</strong>
              {question.question && (
                <div className="mt-1" style={{ fontSize: "0.95rem", color: "#555" }}>
                  {question.question}
                </div>
              )}
            </div>

            <div className="d-flex flex-column align-items-end">
              {question.points && <Badge bg="secondary" className="mb-1">{question.points} pts</Badge>}
              {submitted && (
                <Badge bg={isQuestionCorrect(question) ? "success" : "danger"}>
                  {isQuestionCorrect(question) ? "✓ Correct" : "✗ Incorrect"}
                </Badge>
              )}
            </div>
          </div>


            {/* MCQ */}
            {question.type === "MCQ" && question.options?.map((o, i) => (
              <FormCheck 
                key={i}
                type="checkbox"
                label={o.text}
                checked={Array.isArray(answers[question._id]) ? answers[question._id].includes(i) : false}
                onChange={() => handleMCQAnswerChange(question._id, i)}
                disabled={submitted || (hasTakenQuiz && !canRetakeQuiz())}
              />
            ))}

            {/* TF */}
            {question.type === "TF" && ["True","False"].map(val => (
              <FormCheck
                key={val}
                type="radio"
                name={question._id}
                label={val}
                checked={answers[question._id] === val}
                onChange={() => handleAnswerChange(question._id, val)}
                disabled={submitted || (hasTakenQuiz && !canRetakeQuiz())}
              />
            ))}

            {/* FIB */}
            {question.type === "FIB" && question.answers?.map((blank, bIdx) => (
              <FormControl
                key={bIdx}
                className="mt-2"
                placeholder={`Blank ${bIdx+1}${blank.blankText ? `: ${blank.blankText}` : ""}`}
                value={(answers[question._id]?.[bIdx] || "")}
                onChange={e => {
                  const updated = [...(answers[question._id] || [])];
                  updated[bIdx] = e.target.value;
                  handleAnswerChange(question._id, updated);
                }}
                disabled={submitted || (hasTakenQuiz && !canRetakeQuiz())}
              />
            ))}

            {/* Previous / Next */}
            <div className="d-flex justify-content-between mt-3">
              <Button onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex-1))} disabled={currentQuestionIndex===0}>Previous</Button>
              <Button onClick={() => setCurrentQuestionIndex(Math.min(questions.length-1, currentQuestionIndex+1))} disabled={currentQuestionIndex===questions.length-1}>Next</Button>
            </div>
          </Card.Body>
        </Card>
      )}

      {!submitted && questions.length > 0 && (
        <div className="d-flex justify-content-end mt-4">
          <Button onClick={handleSubmit}>Submit Quiz</Button>
        </div>
      )}

      {submitted && score !== null && (
        <Alert variant={score >= 70 ? "success" : score >= 60 ? "warning" : "danger"} className="mt-3">
          Score: {score.toFixed(1)}%
        </Alert>
      )}
    </div>
  )
}
