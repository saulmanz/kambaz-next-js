/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormLabel, FormControl, Button, FormCheck } from "react-bootstrap";
import { useState } from "react";

interface Option {
  text: string;
  correct: boolean;
}

interface MCQEditorProps {
  question: any;
  index: number;
  onChange: (index: number, updated: any) => void;
}

export function MCQEditor({ question, index, onChange }: MCQEditorProps) {
  const [options, setOptions] = useState<Option[]>(
    question.options || [
      { text: "Option 1", correct: false },
      { text: "Option 2", correct: false },
    ]
  );

  const update = (newOptions: Option[]) => {
    setOptions(newOptions);
    onChange(index, { ...question, options: newOptions });
  };

  return (
    <div className="mt-3 p-3 border rounded">
      <FormLabel>Question Text</FormLabel>
      <FormControl
        as="textarea"
        rows={2}
        value={question.question || ""}
        onChange={(e) =>
          onChange(index, { ...question, question: e.target.value })
        }
      />

      <br />
      <FormLabel>Options</FormLabel>

      {options.map((opt, i) => (
        <div key={i} className="d-flex align-items-center gap-2 mb-2">
          <FormCheck
            type="checkbox"
            checked={opt.correct}
            onChange={() =>
              update(options.map((o, idx) =>
                idx === i ? { ...o, correct: !o.correct } : o
              ))
            }
          />

          <FormControl
            type="text"
            value={opt.text}
            onChange={(e) =>
              update(options.map((o, idx) =>
                idx === i ? { ...o, text: e.target.value } : o
              ))
            }
          />

          <Button
            variant="outline-danger"
            size="sm"
            onClick={() =>
              update(options.filter((_, idx) => idx !== i))
            }
          >
            X
          </Button>
        </div>
      ))}

      <br />

      <Button size="sm" onClick={() => update([...options, { text: "", correct: false }])}>
        Add Option
      </Button>
    </div>
  );
}

