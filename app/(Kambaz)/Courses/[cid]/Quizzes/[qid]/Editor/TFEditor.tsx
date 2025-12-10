import { FormLabel, FormControl, FormCheck } from "react-bootstrap";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function TFEditor({ question, index, onChange }: any) {
  return (
    <div className="mt-3 p-3 border rounded">
      <FormLabel>Question Text</FormLabel>

      <FormControl
        type="text"
        value={question.name || ""}
        onChange={(e) =>
          onChange(index, { ...question, name: e.target.value })
        }
      />

      <br />

      <FormLabel>Correct Answer</FormLabel>

      <div className="d-flex gap-3 mt-2">
        <FormCheck
          type="radio"
          name={`tf-${index}`}
          label="True"
          checked={question.answer === "True"}
          onChange={() =>
            onChange(index, { ...question, answer: "True" })
          }
        />

        <FormCheck
          type="radio"
          name={`tf-${index}`}
          label="False"
          checked={question.answer === "False"}
          onChange={() =>
            onChange(index, { ...question, answer: "False" })
          }
        />
      </div>
    </div>
  );
}
