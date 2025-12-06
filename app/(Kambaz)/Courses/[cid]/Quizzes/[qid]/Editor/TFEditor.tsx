import { FormLabel, FormControl } from "react-bootstrap";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function TFEditor({ question, index, onChange }: any) {
  return (
    <div className="mt-3 p-3 border rounded">
      <FormLabel>Question Text</FormLabel>
      <FormControl
        type="text"
        value={question.name}
        onChange={(e) =>
          onChange(index, { name: e.target.value })
        }
      />

      <br />
      <FormLabel>Correct Answer</FormLabel>
      <FormControl
        as="select"
        value={question.answer || "True"}
        onChange={(e) =>
          onChange(index, { answer: e.target.value })
        }
      >
        <option value="True">True</option>
        <option value="False">False</option>
      </FormControl>
    </div>
  );
}
