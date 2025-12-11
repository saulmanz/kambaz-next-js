/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormLabel, FormControl, Button } from "react-bootstrap";
import { useState } from "react";

export function FIBEditor({ question, index, onChange }: any) {
  const [answers, setAnswers] = useState(
    Array.isArray(question.answers) ? question.answers : [{ blankText: "", correctAnswers: [""] }]
  );

  const update = (updated: any[]) => {
    setAnswers(updated);
    onChange(index, { ...question, answers: updated });
  };

  const updateBlankText = (i: number, text: string) => {
    const updated = answers.map((a: any, idx: number) => (idx === i ? { ...a, blankText: text } : a));
    update(updated);
  };

  const updateCorrectAnswer = (i: number, j: number, text: string) => {
    const updated = answers.map((a: { correctAnswers: any[]; }, idx: number) =>
      idx === i
        ? { ...a, correctAnswers: a.correctAnswers.map((c: any, k: number) => (k === j ? text : c)) }
        : a
    );
    update(updated);
  };

  const addBlank = () => update([...answers, { blankText: "", correctAnswers: [""] }]);
  const removeBlank = (i: number) => update(answers.filter((_: any, idx: number) => idx !== i));
  const addCorrectAnswer = (i: number) => {
    const updated = answers.map((a: { correctAnswers: any; }, idx: number) => (idx === i ? { ...a, correctAnswers: [...a.correctAnswers, ""] } : a));
    update(updated);
  };
  const removeCorrectAnswer = (i: number, j: number) => {
    const updated = answers.map((a: { correctAnswers: any[]; }, idx: number) =>
      idx === i ? { ...a, correctAnswers: a.correctAnswers.filter((_: any, k: number) => k !== j) } : a
    );
    update(updated);
  };

  return (
    <div className="mt-3 p-3 border rounded">
      <FormLabel>Question Text</FormLabel>
      <FormControl
        as="textarea"
        rows={2}
        value={question.question || ""}
        onChange={(e) => onChange(index, { ...question, question: e.target.value })}
      />

      <br />
      <FormLabel>Blanks</FormLabel>
      <br />
      {answers.map((ans: { blankText: string | number | string[] | undefined; correctAnswers: any[]; }, i: any) => (
        <div key={i} className="mb-3 p-2 border rounded">
          <strong>Blank #{i + 1}</strong>
          <br/>
          <FormLabel className="mt-2">Blank Text</FormLabel>
          <FormControl
            type="text"
            value={ans.blankText}
            onChange={(e) => updateBlankText(i, e.target.value)}
          />

          <FormLabel className="mt-2">Correct Answers</FormLabel>
          {ans.correctAnswers.map((c: string | number | string[] | undefined, j: any) => (
            <div key={j} className="d-flex align-items-center gap-2 mb-2">
              <FormControl
                type="text"
                value={c}
                placeholder="Correct answer"
                onChange={(e) => updateCorrectAnswer(i, j, e.target.value)}
              />
              <Button size="sm" variant="outline-danger" onClick={() => removeCorrectAnswer(i, j)}>✕</Button>
            </div>
          ))}
          <Button size="sm" onClick={() => addCorrectAnswer(i)}>+ Add Correct Answer</Button>

          <br />
          <Button size="sm" variant="outline-danger" className="mt-2" onClick={() => removeBlank(i)}>Remove Blank</Button>
        </div>
      ))}
      <Button size="sm" onClick={addBlank}>+ Add Another Blank</Button>
    </div>
  );
}
