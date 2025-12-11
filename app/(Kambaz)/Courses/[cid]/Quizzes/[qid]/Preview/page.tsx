/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
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
  answers?: string[];
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
  const router = useRouter();
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

  useEffect(() => {
    if (!qid) return;

    const loadQuiz = async () => {
      try {
        const q = await client.findQuizById(qid.toString());
        setQuiz(q);
        
        // Check if student has already taken this quiz
        let quizTaken = false;
        if (role === "STUDENT" && currentUser && q.studentScores) {
          const userId = currentUser._id;
          // Try to match by string ID or convert to number
          const studentScoreEntry = q.studentScores.find(
            (score: StudentScore) => 
              String(score.studentId) === String(userId) || 
              score.studentId === Number(userId) ||
              score.studentId === userId
          );
          
          if (studentScoreEntry) {
            setStudentScore(studentScoreEntry);
            quizTaken = true;
            setHasTakenQuiz(true);
            setSubmitted(true); // Mark as submitted to show read-only
            // Calculate percentage score
            const percentage = q.points > 0 ? (studentScoreEntry.lastScore / q.points) * 100 : 0;
            setScore(percentage);
            // Load previous answers if they exist
            if (studentScoreEntry.answers) {
              setAnswers(studentScoreEntry.answers);
            }
          }
        }
        
        // Initialize timer if time limit exists, quiz not already taken, and quiz has questions
        if (q.timeLimit && !isPreview && !quizTaken && q.questions && q.questions.length > 0) {
          setTimeRemaining(q.timeLimit * 60); // Convert minutes to seconds
        }
      } catch (err) {
        console.error("Failed to load quiz:", err);
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [qid, isPreview, role, currentUser]);

  const calculateScore = useCallback((): { earnedPoints: number; totalPoints: number } => {
    if (!quiz) return { earnedPoints: 0, totalPoints: 0 };
    
    let totalPoints = 0;
    let earnedPoints = 0;

    quiz.questions.forEach((question) => {
      totalPoints += question.points || 0;
      const userAnswer = answers[question._id];

      if (question.type === "MCQ" && question.options) {
        const correctIndex = question.options.findIndex((opt: any) => opt.correct);
        if (userAnswer === correctIndex) {
          earnedPoints += question.points || 0;
        }
      } else if (question.type === "TF" && question.answer) {
        if (userAnswer === question.answer) {
          earnedPoints += question.points || 0;
        }
      } else if (question.type === "FIB" && question.answers) {
        const userAnswerLower = (userAnswer || "").toLowerCase().trim();
        const isCorrect = question.answers.some(
          (ans: string) => ans.toLowerCase().trim() === userAnswerLower
        );
        if (isCorrect) {
          earnedPoints += question.points || 0;
        }
      }
    });

    return { earnedPoints, totalPoints };
  }, [quiz, answers]);

  // Check if a specific question was answered correctly
  const isQuestionCorrect = useCallback((question: Question): boolean => {
    if (!question) return false;
    const userAnswer = answers[question._id];

    if (question.type === "MCQ" && question.options) {
      const correctIndex = question.options.findIndex((opt: any) => opt.correct);
      return userAnswer === correctIndex;
    } else if (question.type === "TF" && question.answer) {
      return userAnswer === question.answer;
    } else if (question.type === "FIB" && question.answers) {
      const userAnswerLower = (userAnswer || "").toLowerCase().trim();
      return question.answers.some(
        (ans: string) => ans.toLowerCase().trim() === userAnswerLower
      );
    }

    return false;
  }, [answers]);

  // Timer countdown
  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0 || isPreview || submitted) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 1) {
          // Auto-submit when time runs out
          setSubmitted(true);
          const { earnedPoints, totalPoints } = calculateScore();
          const percentage = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
          setScore(percentage);
          if (!isPreview && currentUser && qid && role === "STUDENT") {
            // Save score to database with answers
            client.submitQuizScore(qid.toString(), currentUser._id, earnedPoints, answers)
              .then(async (updatedQuiz) => {
                setQuiz(updatedQuiz);
                setHasTakenQuiz(true);
                if (updatedQuiz.studentScores) {
                  const studentScoreEntry = updatedQuiz.studentScores.find(
                    (s: StudentScore) => 
                      String(s.studentId) === String(currentUser._id) || 
                      s.studentId === currentUser._id
                  );
                  if (studentScoreEntry) {
                    setStudentScore(studentScoreEntry);
                    // Update answers state with saved answers
                    if (studentScoreEntry.answers) {
                      setAnswers(studentScoreEntry.answers);
                    }
                  }
                }
                alert("Time is up! Quiz has been submitted.");
              })
              .catch((err) => {
                console.error("Failed to submit quiz score:", err);
                alert("Time is up! Quiz submitted but score may not have been saved.");
              });
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, isPreview, submitted, cid, router, calculateScore, currentUser, qid, role, answers]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = async () => {
    if (submitted) return;
    
    setSubmitted(true);
    
    // Calculate score
    const { earnedPoints, totalPoints } = calculateScore();
    const percentage = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
    setScore(percentage);

    if (isPreview) {
      // Faculty preview - show score but don't save
      return;
    }

    // Save score to database for students
    if (currentUser && qid && role === "STUDENT") {
      try {
        await client.submitQuizScore(qid.toString(), currentUser._id, earnedPoints, answers);
        // Reload quiz to get updated studentScores
        const updatedQuiz = await client.findQuizById(qid.toString());
        setQuiz(updatedQuiz);
        setHasTakenQuiz(true);
        if (updatedQuiz.studentScores) {
          const studentScoreEntry = updatedQuiz.studentScores.find(
            (s: StudentScore) => 
              String(s.studentId) === String(currentUser._id) || 
              s.studentId === currentUser._id
          );
          if (studentScoreEntry) {
            setStudentScore(studentScoreEntry);
            // Update answers state with saved answers
            if (studentScoreEntry.answers) {
              setAnswers(studentScoreEntry.answers);
            }
          }
        }
      } catch (err) {
        console.error("Failed to submit quiz score:", err);
        alert("Failed to save quiz score. Please try again.");
        setSubmitted(false);
        return;
      }
    }

    alert(`Quiz submitted! Score: ${earnedPoints}/${totalPoints} (${percentage.toFixed(1)}%)`);
    // Don't navigate away - show the read-only view with their score
  };

  const handleRetakeQuiz = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(null);
    setHasTakenQuiz(false);
    setStudentScore(null);
    if (quiz?.timeLimit && !isPreview && quiz.questions && quiz.questions.length > 0) {
      setTimeRemaining(quiz.timeLimit * 60);
    }
  };

  // Check if student can retake the quiz
  const canRetakeQuiz = () => {
    if (isPreview) return false; // Faculty can always retake in preview
    if (!quiz?.multipleAttempts) return false; // Multiple attempts must be enabled
    if (!studentScore) return false; // Must have taken the quiz at least once
    
    const currentAttempt = studentScore.attempt || 0;
    const maxAttempts = quiz.maxAttempts;
    
    // If maxAttempts is null, unlimited attempts allowed
    if (maxAttempts === null || maxAttempts === undefined) return true;
    
    // Check if current attempt is less than max attempts
    return currentAttempt < maxAttempts;
  };

  if (loading) {
    return <div>Loading quiz...</div>;
  }

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  const questions = quiz.questions || [];

  return (
    <div id="wd-quiz-preview">
      <hr />
      
      {/* Preview Banner for Faculty */}
      {isPreview && !hasTakenQuiz && (
        <Alert variant="warning" className="mb-4">
          <strong>PREVIEW MODE</strong> - You are taking this quiz as a student would. Your score will be shown but not saved.
        </Alert>
      )}

      {/* Already Taken Banner for Students */}
      {hasTakenQuiz && role === "STUDENT" && (
        <Alert variant="info" className="mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <strong>Quiz Already Completed</strong> - You have already taken this quiz. Your answers are shown below in read-only mode.
              {studentScore && (
                <div className="mt-2">
                  Attempt {studentScore.attempt}
                  {quiz.maxAttempts && ` of ${quiz.maxAttempts}`}
                  {!quiz.maxAttempts && " (unlimited attempts allowed)"}
                </div>
              )}
            </div>
            {canRetakeQuiz() && (
              <Button variant="outline-primary" onClick={handleRetakeQuiz}>
                Take Quiz Again
              </Button>
            )}
            {!canRetakeQuiz() && quiz.multipleAttempts && (
              <div className="text-muted">
                Maximum attempts reached
              </div>
            )}
          </div>
        </Alert>
      )}

      {/* Score Display - Show for students who have taken quiz or after submission */}
      {(hasTakenQuiz || (submitted && score !== null)) && score !== null && (
        <Alert variant={score >= 70 ? "success" : score >= 60 ? "warning" : "danger"} className="mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <strong>Quiz Score: {score.toFixed(1)}%</strong>
              {quiz && studentScore && (
                <div className="mt-2">
                  {studentScore.lastScore} out of {quiz.points} points
                </div>
              )}
              {quiz && !studentScore && (
                <div className="mt-2">
                  {calculateScore().earnedPoints} out of {calculateScore().totalPoints} points
                </div>
              )}
            </div>
            {isPreview && !hasTakenQuiz && (
              <Button variant="outline-primary" onClick={handleRetakeQuiz}>
                Take Quiz Again
              </Button>
            )}
          </div>
        </Alert>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>{quiz.title || "Untitled Quiz"}</h2>
          {timeRemaining !== null && !isPreview && (
            <Badge bg={timeRemaining < 300 ? "danger" : "info"} className="ms-2">
              Time Remaining: {formatTime(timeRemaining)}
            </Badge>
          )}
        </div>
        <div className="d-flex gap-2">
          {isPreview ? (
            <Link href={`/Courses/${cid}/Quizzes/${qid}`}>
              <Button variant="secondary">Back to Quiz Details</Button>
            </Link>
          ) : (
            <Link href={`/Courses/${cid}/Quizzes`}>
              <Button variant="secondary">Cancel</Button>
            </Link>
          )}
        </div>
      </div>

      {/* Quiz Instructions */}
      {quiz.instruction && (
        <Card className="mb-4">
          <Card.Body>
            <h5>Instructions</h5>
            <div style={{ whiteSpace: "pre-wrap" }}>{quiz.instruction}</div>
            <div className="mt-2">
              <strong>Total Points:</strong> {quiz.points} | 
              <strong> Questions:</strong> {questions.length}
              {quiz.timeLimit > 0 && (
                <> | <strong> Time Limit:</strong> {quiz.timeLimit} minutes</>
              )}
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Questions */}
      <div className={`mb-4 ${hasTakenQuiz && !canRetakeQuiz() ? "opacity-50" : ""}`} style={hasTakenQuiz && !canRetakeQuiz() ? { opacity: 0.6 } : {}}>
        {questions.map((question, index) => {
          // Determine if question was answered correctly (only show for completed quizzes)
          const isCorrect = hasTakenQuiz && !canRetakeQuiz() && submitted ? isQuestionCorrect(question) : null;
          const borderColor = isCorrect === true ? "success" : isCorrect === false ? "danger" : "secondary";
          
          return (
          <Card 
            key={question._id || index} 
            className="mb-3"
            border={hasTakenQuiz && !canRetakeQuiz() && submitted ? borderColor : undefined}
            style={
              hasTakenQuiz && !canRetakeQuiz() && submitted
                ? {
                    borderWidth: "3px",
                    backgroundColor: isCorrect === true ? "rgba(25, 135, 84, 0.1)" : isCorrect === false ? "rgba(220, 53, 69, 0.1)" : undefined
                  }
                : {}
            }
          >
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h5>
                  Question {index + 1} 
                  {question.points && (
                    <Badge bg="secondary" className="ms-2">{question.points} pts</Badge>
                  )}
                  {hasTakenQuiz && !canRetakeQuiz() && submitted && isCorrect !== null && (
                    <Badge bg={isCorrect ? "success" : "danger"} className="ms-2">
                      {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                    </Badge>
                  )}
                </h5>
              </div>

              <div className="mb-3">
                <strong>{question.name || "(Untitled Question)"}</strong>
              </div>

              {/* Multiple Choice Question */}
              {question.type === "MCQ" && question.options && (
                <div>
                  {question.options.map((option: any, optIndex: number) => (
                    <div key={optIndex} className="mb-2">
                      <FormCheck
                        type="radio"
                        name={`question-${question._id}`}
                        id={`option-${question._id}-${optIndex}`}
                        label={option.text}
                        checked={answers[question._id] === optIndex}
                        onChange={() => handleAnswerChange(question._id, optIndex)}
                        disabled={submitted || (hasTakenQuiz && !canRetakeQuiz())}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* True/False Question */}
              {question.type === "TF" && (
                <div>
                  <FormCheck
                    type="radio"
                    name={`question-${question._id}`}
                    id={`tf-${question._id}-true`}
                    label="True"
                    checked={answers[question._id] === "True"}
                    onChange={() => handleAnswerChange(question._id, "True")}
                    disabled={submitted || (hasTakenQuiz && !canRetakeQuiz())}
                  />
                  <FormCheck
                    type="radio"
                    name={`question-${question._id}`}
                    id={`tf-${question._id}-false`}
                    label="False"
                    checked={answers[question._id] === "False"}
                    onChange={() => handleAnswerChange(question._id, "False")}
                    disabled={submitted || (hasTakenQuiz && !canRetakeQuiz())}
                    className="mt-2"
                  />
                </div>
              )}

              {/* Fill in the Blank Question */}
              {question.type === "FIB" && (
                <div>
                  <FormControl
                    type="text"
                    placeholder="Enter your answer"
                    value={answers[question._id] || ""}
                    onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                    disabled={submitted || (hasTakenQuiz && !canRetakeQuiz())}
                  />
                </div>
              )}
            </Card.Body>
          </Card>
          );
        })}
      </div>

      {/* Submit Button - Show if quiz has questions and (hasn't been taken OR can retake) */}
      {questions.length > 0 && (!hasTakenQuiz || (hasTakenQuiz && canRetakeQuiz() && !submitted)) && (
        <div className="d-flex justify-content-end mb-4">
          <Button 
            variant="primary" 
            size="lg" 
            onClick={handleSubmit}
            disabled={submitted}
          >
            {submitted ? "Submitted" : "Submit Quiz"}
          </Button>
        </div>
      )}

      {questions.length === 0 && (
        <Alert variant="info">
          {isPreview 
            ? "This quiz has no questions yet. Please add questions in the editor."
            : "This quiz has no questions yet. Come back later."
          }
        </Alert>
      )}
    </div>
  );
}
