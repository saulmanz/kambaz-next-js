"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button, Col, FormControl, FormLabel, InputGroup, Row } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addAssignment } from "../reducer";

interface Assignment {
  course: string;
  name: string;
  description: string;
  points: string;
  dueDate: string;
  availableDate: string;
  availableUntil: string;
}

export default function AssignmentEditor() {
  const dispatch = useDispatch();
  const { cid } = useParams();
  const router = useRouter();

  const [assignment, setAssignment] = useState<Assignment>({
    course: cid || "",
    name: "New Assignment",
    description: "Description",
    points: "100",
    dueDate: "2023-12-15",
    availableDate: "2023-12-15",
    availableUntil: "2023-12-15",
  });

  return (
    <div id="wd-assignments-editor">
      <FormLabel>Assignment Name</FormLabel>
      <FormControl
        as="textarea"
        rows={1}
        value={assignment.name}
        onChange={(e) => setAssignment({ ...assignment, name: e.target.value })}
        className="mb-3"
      />

      <FormControl
        as="textarea"
        rows={5}
        value={assignment.description}
        onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
        className="mb-3"
      />

      <Row className="mb-3">
        <FormLabel column sm={2}>Points</FormLabel>
        <Col sm={10}>
          <FormControl
            type="number"
            value={assignment.points}
            onChange={(e) => setAssignment({ ...assignment, points: e.target.value })}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <FormLabel column sm={2}>Dates</FormLabel>
        <Col sm={10}>
          <div className="border p-3">
            <FormLabel>Due</FormLabel>
            <InputGroup className="mb-2">
              <input
                type="date"
                className="form-control"
                value={assignment.dueDate}
                onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}
              />
            </InputGroup>

            <Row>
              <Col>
                <FormLabel>Available From</FormLabel>
                <InputGroup>
                  <input
                    type="date"
                    className="form-control"
                    value={assignment.availableDate}
                    onChange={(e) => setAssignment({ ...assignment, availableDate: e.target.value })}
                  />
                </InputGroup>
              </Col>

              <Col>
                <FormLabel>Until</FormLabel>
                <InputGroup>
                  <input
                    type="date"
                    className="form-control"
                    value={assignment.availableUntil}
                    onChange={(e) => setAssignment({ ...assignment, availableUntil: e.target.value })}
                  />
                </InputGroup>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <div className="d-flex gap-2 float-end">
        <Link href={`/Courses/${cid}/Assignments`}>
          <Button variant="secondary" size="lg">Cancel</Button>
        </Link>
        <Button
          variant="danger"
          size="lg"
          onClick={() => {
            dispatch(addAssignment(assignment));
            router.push(`/Courses/${cid}/Assignments`);
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
