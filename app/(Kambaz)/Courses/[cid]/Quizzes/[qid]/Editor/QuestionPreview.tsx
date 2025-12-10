"use client";

import { Button } from "react-bootstrap";

export default function QuestionPreview({
  question,
  onEdit,
  onDelete
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  question: any;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <strong>{question.name || "(Untitled Question)"}</strong>

        <div className="text-muted">
          Type: {question.type} • {question.points} pts
        </div>

        {question.type === "MCQ" && question.options && (
          <div className="text-muted small">
            {question.options.length} options
          </div>
        )}

        {question.type === "FIB" && question.answers && (
          <div className="text-muted small">
            {question.answers.length} answers
          </div>
        )}
      </div>

      <div className="d-flex gap-2">
        <Button variant="secondary" size="sm" onClick={onEdit}>
          Edit
        </Button>

        <Button variant="danger" size="sm" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
