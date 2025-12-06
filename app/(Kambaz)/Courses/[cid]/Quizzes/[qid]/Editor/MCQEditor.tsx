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

  const updateText = (i: number, text: string) => {
    const updated = options.map((opt, idx) =>
      idx === i ? { ...opt, text } : opt
    );
    update(updated);
  };

  const toggleCorrect = (i: number) => {
    const updated = options.map((opt, idx) =>
      idx === i ? { ...opt, correct: !opt.correct } : opt
    );
    update(updated);
  };

  const addOption = () => {
    update([...options, { text: "New Option", correct: false }]);
  };

  const removeOption = (i: number) => {
    const updated = options.filter((_, idx) => idx !== i);
    update(updated);
  };

  return (
    <div className="mt-3 p-3 border rounded">
      <FormLabel>Question Text</FormLabel>
      <FormControl
        type="text"
        defaultValue={question.name}
        onChange={(e) =>
          onChange(index, { ...question, name: e.target.value })
        }
      />

      <br />
      <FormLabel>Options</FormLabel>

      {options.map((opt, i) => (
        <div key={i} className="d-flex align-items-center gap-2 mb-2">
          <FormCheck
            type="checkbox"
            checked={opt.correct}
            onChange={() => toggleCorrect(i)}
          />

          <FormControl
            type="text"
            value={opt.text}
            onChange={(e) => updateText(i, e.target.value)}
          />

          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => removeOption(i)}
          >
            ✕
          </Button>
        </div>
      ))}
      <br/>

      <Button size="sm" onClick={addOption}>
        Add Option
      </Button>
    </div>
  );
}
