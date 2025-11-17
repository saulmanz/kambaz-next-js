"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button, Col, FormControl, FormLabel, InputGroup, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import * as client from "../client";
import { addAssignment, updateAssignment as updateRedux } from "../reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const [assignment, setAssignment] = useState({
    _id: "",
    title: "",
    description: "",
    course: cid,
    points: 100,
    available: "2025-05-06",
    due: "2025-05-13",
    group: "ASSIGNMENTS",
  });

  useEffect(() => {
  if (!aid || aid as string == "AssignmentEditor") return;

  const loadAssignment = async () => {
    const a = await client.findAssignmentById(aid.toString());
    setAssignment({
      _id: a._id ?? "",
      title: a.title ?? "",
      description: a.description ?? "",
      course: a.course ?? cid,
      points: a.points ?? 100,
      available: a.available ?? "",
      due: a.due ?? "",
      group: a.group ?? "ASSIGNMENTS",
    });
  };

    loadAssignment();
  }, [aid, cid]);


  const save = async () => {
    try {
      if (!aid || aid as string == "AssignmentEditor") {
        const newA = await client.createAssignment(assignment);
        dispatch(addAssignment(newA));
      } else {
        const updated = await client.updateAssignment(assignment);
        dispatch(updateRedux(updated));
      }
      router.push(`/Courses/${cid}/Assignments`);
    } catch (err) {
      console.error("Failed to save assignment:", err);
      alert("Failed to save assignment. Check console for details.");
    }
  };

  return (
    <div id="wd-assignments-editor">
      <FormLabel>Assignment Title</FormLabel>
      <FormControl
        as="textarea"
        rows={1}
        value={assignment.title}
        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
      />

      <br />

      <FormLabel>Description</FormLabel>
      <FormControl
        as="textarea"
        rows={6}
        value={assignment.description}
        onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
      />

      <br />

      <Row className="mb-3">
        <FormLabel column sm={2}>Points</FormLabel>
        <Col sm={10}>
          <FormControl
            type="number"
            value={assignment.points}
            onChange={(e) =>
              setAssignment({ ...assignment, points: Number(e.target.value) })
            }
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <FormLabel column sm={2}>Available From</FormLabel>
        <Col sm={10}>
          <InputGroup>
            <input
              type="date"
              className="form-control"
              value={assignment.available}
              onChange={(e) =>
                setAssignment({ ...assignment, available: e.target.value })
              }
            />
          </InputGroup>
        </Col>
      </Row>

      <Row className="mb-3">
        <FormLabel column sm={2}>Due</FormLabel>
        <Col sm={10}>
          <InputGroup>
            <input
              type="date"
              className="form-control"
              value={assignment.due}
              onChange={(e) =>
                setAssignment({ ...assignment, due: e.target.value })
              }
            />
          </InputGroup>
        </Col>
      </Row>

      <div className="d-flex gap-2 float-end">
        <Link href={`/Courses/${cid}/Assignments`}>
          <Button variant="secondary" size="lg">Cancel</Button>
        </Link>

        <Button variant="danger" size="lg" onClick={save}>Save</Button>
      </div>
    </div>
  );
}
