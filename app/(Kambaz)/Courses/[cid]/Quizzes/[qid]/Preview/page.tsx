"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "react-bootstrap";

export default function QuizPreview() {
  const { cid, qid } = useParams();

  return (
    <div id="wd-quiz-preview">
      <hr />
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Quiz Preview</h2>
        <Link href={`/Courses/${cid}/Quizzes/${qid}`}>
          <Button variant="secondary">Back to Quiz Details</Button>
        </Link>
      </div>

      <div className="p-4">
        <p>Quiz preview will be implemented here.</p>
        <p>This page is for teachers to preview how the quiz will appear to students.</p>
      </div>
    </div>
  );
}

