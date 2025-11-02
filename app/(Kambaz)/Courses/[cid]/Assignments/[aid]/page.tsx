"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Button,
  Col,
  FormCheck,
  FormControl,
  FormLabel,
  FormSelect,
  InputGroup,
  Row,
} from "react-bootstrap";
import { BsXLg } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAssignment } from "../reducer";

interface Assignment {
  _id: string;
  course: string;
  title: string;
  description: string;
  points: number | string;
  dueDate: string;
  availableDate: string;
  availableUntil: string;
  group?: string;
  gradeDisplay?: string;
  submissionType?: string;
}

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { assignments } = useSelector((state: any) => state.assignmentReducer);

  const assignmentFromStore = assignments.find(
    (a: Assignment) => a.course === cid && a._id === aid
  );

  const [assignment, setAssignment] = useState<Assignment | null>(
    assignmentFromStore || null
  );

  if (!assignment) return <div>Assignment not found</div>;

  return (
    <div id="wd-assignments-editor">
      <FormLabel>Assignment Name</FormLabel>
      <FormControl
        as="textarea"
        rows={1}
        value={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
        className="mb-3"
      />

      <FormControl
        as="textarea"
        rows={5}
        value={assignment.description}
        onChange={(e) =>
          setAssignment({ ...assignment, description: e.target.value })
        }
        className="mb-3"
      />

      <Row className="mb-3">
        <FormLabel column sm={2}>
          Points
        </FormLabel>
        <Col sm={10}>
          <FormControl
            type="number"
            value={assignment.points}
            onChange={(e) =>
              setAssignment({ ...assignment, points: e.target.value })
            }
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <FormLabel column sm={2}>
          Assignment Group
        </FormLabel>
        <Col sm={10}>
          <FormSelect
            value={assignment.group || "ASSIGNMENTS"}
            onChange={(e) =>
              setAssignment({ ...assignment, group: e.target.value })
            }
          >
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="PROJECTS">PROJECTS</option>
            <option value="OTHER">OTHER</option>
            <option value="OTHER2">OTHER2</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3">
        <FormLabel column sm={2}>
          Display Grade As
        </FormLabel>
        <Col sm={10}>
          <FormSelect
            value={assignment.gradeDisplay || "PERCENTAGE"}
            onChange={(e) =>
              setAssignment({ ...assignment, gradeDisplay: e.target.value })
            }
          >
            <option value="PERCENTAGE">PERCENTAGE</option>
            <option value="PROJECTS">PROJECTS</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3">
        <FormLabel column sm={2}>
          Submission Type
        </FormLabel>
        <Col sm={10}>
          <div className="border p-3">
            <FormSelect
              value={assignment.submissionType || "ONLINE"}
              onChange={(e) =>
                setAssignment({ ...assignment, submissionType: e.target.value })
              }
            >
              <option value="ONLINE">ONLINE</option>
              <option value="IN_PERSON">IN PERSON</option>
            </FormSelect>

            <FormLabel column sm={2} className="mt-3">
              Online Entry Options
            </FormLabel>
            <FormCheck
              type="radio"
              label="Text Entry"
              name="wd-text-entry"
              checked
            />
            <FormCheck type="radio" label="Website URL" name="wd-text-entry" />
            <FormCheck
              type="radio"
              label="Media Recordings"
              name="wd-text-entry"
            />
            <FormCheck
              type="radio"
              label="Student Annotation"
              name="wd-text-entry"
            />
            <FormCheck type="radio" label="File Upload" name="wd-text-entry" />
          </div>
        </Col>
      </Row>

      <Row className="mb-3">
        <FormLabel column sm={2}>
          Assign
        </FormLabel>
        <Col sm={10}>
          <div className="border p-3">
            <FormLabel>Due</FormLabel>
            <InputGroup className="mb-2">
              <input
                type="date"
                className="form-control"
                value={assignment.dueDate}
                onChange={(e) =>
                  setAssignment({ ...assignment, dueDate: e.target.value })
                }
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
                    onChange={(e) =>
                      setAssignment({ ...assignment, availableDate: e.target.value })
                    }
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
                    onChange={(e) =>
                      setAssignment({ ...assignment, availableUntil: e.target.value })
                    }
                  />
                </InputGroup>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <hr />
      <div className="d-flex gap-2 ms-3 float-end">
        <Link href={`/Courses/${cid}/Assignments`}>
          <Button variant="secondary" size="lg">
            Cancel
          </Button>
        </Link>

        <Button
          variant="danger"
          size="lg"
          onClick={() => {
            dispatch(updateAssignment(assignment));
            router.push(`/Courses/${cid}/Assignments`);
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
