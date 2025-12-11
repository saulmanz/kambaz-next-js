"use client";
import {
  Button,
  Col,
  FormCheck,
  FormControl,
  FormLabel,
  InputGroup,
  Row
} from "react-bootstrap";
import Link from "next/link";

export default function QuizDetailsTab({
  quiz,
  cid,
  setQuiz,
  save,
  saveAndPublish
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) {
  return (
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
            onChange={(e) => {
              const newValue = e.target.checked;
              setQuiz({ 
                ...quiz, 
                multipleAttempts: newValue,
                maxAttempts: newValue ? (quiz.maxAttempts || 3) : null // Default to 3 if enabling
              });
            }}
          />
          {quiz.multipleAttempts && (
            <div className="ms-4 mb-2">
              <FormLabel>Maximum Attempts</FormLabel>
              <FormControl
                type="number"
                min={1}
                value={quiz.maxAttempts || ""}
                onChange={(e) => setQuiz({ ...quiz, maxAttempts: e.target.value ? Number(e.target.value) : null })}
                placeholder="Unlimited"
                style={{ maxWidth: "150px" }}
              />
              <small className="text-muted">Leave empty for unlimited attempts</small>
            </div>
          )}
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

      <Row className="mb-3">
        <FormLabel column sm={2}>Assign</FormLabel>
        <Col sm={10}>
          <div className="border p-3">
            <FormLabel>Due</FormLabel>
            <InputGroup className="mb-2">
              <input
                type="date"
                className="form-control"
                value={quiz.due}
                onChange={(e) => setQuiz({ ...quiz, due: e.target.value })}
              />
            </InputGroup>

            <Row>
              <Col>
                <FormLabel>Available From</FormLabel>
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
                <FormLabel>Until</FormLabel>
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

      <div className="d-flex justify-content-end gap-2 mt-4 mb-5">
        <Link href={`/Courses/${cid}/Quizzes`}>
          <Button variant="secondary" size="lg">Cancel</Button>
        </Link>

        <Button variant="danger" size="lg" onClick={save}>Save</Button>
        <Button variant={quiz.published ? "danger" : "success"} size="lg" onClick={saveAndPublish}>
          {quiz.published ? "Save & Unpublish" : "Save & Publish"}
        </Button>
      </div>
    </>
  );
}
