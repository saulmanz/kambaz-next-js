"use client"
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button, Col, FormCheck, FormControl, FormLabel, FormSelect, InputGroup, Row } from "react-bootstrap";
import { BsXLg } from "react-icons/bs";
import * as db from "../../../../Database/index";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateAssignment } from "../reducer";
import { useSelector } from "react-redux";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentReducer);
  const a = assignments.find(
    (a: any) => a.course === cid && a._id === aid
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const [assignment, setAssignment] = useState<any>(a);

  return (
    <div id="wd-assignments-editor">
        <FormLabel> Assignment Name </FormLabel>
        <FormControl as="textarea" rows={1}  value={assignment.title}
         onChange={(e) => setAssignment({ ...assignment, title: e.target.value })} /><br /><br />
        
        <FormControl as="textarea" rows={10} 
          value={assignment.description}
          onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
        />

        <br />

        <Row className="mb-3" name="points">
            <FormLabel column sm={2}> Points</FormLabel>
            <Col sm={10}>
                <FormControl type="wd-points"  value={assignment.points}
                onChange={(e) => setAssignment({ ...assignment, points: e.target.value })}
                />
            </Col>
        </Row>

        <Row className="mb-3" name="assignment-group">
            <FormLabel column sm={2}> Assignment Group </FormLabel>
            <Col sm={10}>
                <FormSelect>
                <option value="ASSIGNMENTS" defaultChecked>ASSIGNMENTS</option>
                <option value="PROJECTS">PROJECTS</option>
                <option value="OTHER">OTHER</option>
                <option value="OTHER2">OTHER2</option>
                </FormSelect>
            </Col>
        </Row>

        <Row className="mb-3" name="textarea2">
            <FormLabel column sm={2}> Display Grade as </FormLabel>
            <Col sm={10}>
                <FormSelect>
                <option value="PERCENTAGE" defaultChecked>PERCENTAGE</option>
                <option value="PROJECTS">PROJECTS</option>
                </FormSelect>
            </Col>
        </Row>

        <Row className="mb-3" name="textarea2">
            <FormLabel column sm={2}> Submisson type </FormLabel>
            <Col sm={10}>
                <div className="border p-3">
                <FormSelect>
                    <option value="ONLINE" defaultChecked>ONLINE</option>
                    <option value="IN PERSON">IN PERSON</option>
                </FormSelect>
                
                <FormLabel column sm={2}> Online Entry Options </FormLabel>
                <FormCheck type="radio" label="Online Entry Options" name="wd-text-entry" defaultChecked />
                <FormCheck type="radio" label="Text Entry" name="wd-text-entry" />
                <FormCheck type="radio" label="Website URL" name="wd-text-entry" />
                <FormCheck type="radio" label="Media Recordings" name="wd-text-entry" />
                <FormCheck type="radio" label="Student Annotation" name="wd-text-entry" />
                <FormCheck type="radio" label="File Upload" name="wd-text-entry" />
                </div>
            </Col>
        </Row>

        <Row className="mb-2" name="due-date">
            <FormLabel column sm={2}> Assign </FormLabel>
            <Col sm={10}>
            <div className="border p-3">
                <FormLabel column sm={2}> Assign </FormLabel>
                <div className="border p-4">
                <div className="d-inline-flex align-items-center bg-light text-dark rounded-pill px-3 py-1" style={{ cursor: "pointer" }}>
                    <span className="me-2">Everyone</span>
                    <BsXLg/>
                </div>
                </div>

                <FormLabel column sm={2}> Due </FormLabel>
                <InputGroup>
                <input type="date" className="form-control" 
                id="wd-due-date"
                 value={assignment.due}
                onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}
                />
                </InputGroup>

                <Row>
                <Col>
                    <FormLabel column sm={3}> Available From </FormLabel>
                    <InputGroup>
                    <input type="date" className="form-control" 
                    id="wd-available-from"
                     value={assignment.available}
                    onChange={(e) => setAssignment({ ...assignment, availableDate: e.target.value })}
                    />
                    </InputGroup>
                </Col>
                <Col>
                    <FormLabel column sm={2}> Until </FormLabel>
                    <InputGroup>
                    <input type="date" className="form-control" 
                    id="wd-available-unti"
                     value={assignment.due}
                    onChange={(e) => setAssignment({ ...assignment, availableUntil: e.target.value })}
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
        <Link href={`/Courses/${cid}/Assignments`}>
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
        </Link>
      </div>
    </div>
);}
