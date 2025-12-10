/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormLabel, FormControl, Button } from "react-bootstrap";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FIBEditor({ question, index, onChange }: any) {
  // Normalize to an array of answer objects
  const [answers, setAnswers] = useState(
    Array.isArray(question.answers)
      ? question.answers
      : question.answer
      ? [{ text: question.answer, correct: true }]
      : [{ text: "", correct: true }]
  );

  const update = (updated: any[]) => {
    setAnswers(updated);
    onChange(index, { ...question, answers: updated });
  };

  const updateText = (i: number, text: string) => {
    const updated = answers.map((a: any, idx: number) =>
      idx === i ? { ...a, text } : a
    );
    update(updated);
  };

  const addAnswer = () => {
    update([...answers, { text: "", correct: true }]);
  };

  const removeAnswer = (i: number) => {
    const updated = answers.filter((_: any, idx: number) => idx !== i);
    update(updated);
  };

  return (
    <div className="mt-3 p-3 border rounded">
      <FormLabel>Question Text</FormLabel>
      <FormControl
        type="text"
        value={question.name}
        onChange={(e) =>
          onChange(index, { ...question, name: e.target.value })
        }
      />

      <br />
      <FormLabel>Correct Answers</FormLabel>
      <br/>

      {answers.map((ans: any, i: number) => (
        <div key={i} className="d-flex align-items-center gap-2 mb-2">
          <FormControl
            type="text"
            value={ans.text}
            onChange={(e) => updateText(i, e.target.value)}
          />
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => removeAnswer(i)}
          >
            ✕
          </Button>
        </div>
      ))}

      <Button size="sm" onClick={addAnswer}>
        Add Another Blank
      </Button>
    </div>
  );
}
