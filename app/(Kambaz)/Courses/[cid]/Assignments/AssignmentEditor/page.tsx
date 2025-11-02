/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button, Col, FormControl, FormLabel, InputGroup, Row } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addAssignment } from "../reducer";


export default function AssignmentEditor() {
    const dispatch = useDispatch();
    const { cid } = useParams();
    const router = useRouter();
    const [assignment, setAssignment] = useState<any>({
        course: cid, name: "New Course", description: "Desc",
        points: "100", dueDate: "2023-12-15",
        availableDate: "2023-12-15", availableUntil: "2023-12-15"
    });

    return (
        <div id="wd-assignments-editor">
            <FormLabel> Assignment Name </FormLabel>
            <FormControl as="textarea" rows={1} value="Title" 
                onChange={(e) => setAssignment({ ...assignment, name: e.target.value })} /><br /><br />
            
            <FormControl as="textarea" rows={10} 
                defaultValue="Descrpition."
                onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
            />
            <br />

            <Row className="mb-3" name="points">
                <FormLabel column sm={2}> Points</FormLabel>
                <Col sm={10}>
                    <FormControl type="wd-points" value={100} 
                    onChange={(e) => setAssignment({ ...assignment, points: e.target.value })}
                    />

                </Col>
            </Row>

            <Row className="mb-2" name="due-date">
                <FormLabel column sm={2}> Assign </FormLabel>
                <Col sm={10}>
                <div className="border p-3">
                    <FormLabel column sm={2}> Due </FormLabel>
                    <InputGroup>
                    <input type="date" className="form-control" 
                    id="wd-due-date"
                    value={10/31/2025}
                    onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}
                    />
                    </InputGroup>

                    <Row>
                    <Col>
                        <FormLabel column sm={3}> Available From </FormLabel>
                        <InputGroup>
                        <input type="date" className="form-control" 
                        id="wd-available-from"
                        value={10/31/2025}
                        onChange={(e) => setAssignment({ ...assignment, availableDate: e.target.value })}
                        />

                        </InputGroup>
                    </Col>
                    <Col>
                        <FormLabel column sm={2}> Until </FormLabel>
                        <InputGroup>
                        <input type="date" className="form-control" 
                        id="wd-available-unti"
                        value={10/31/2025}
                        onChange={(e) => setAssignment({ ...assignment, availableUntil: e.target.value })}
                        />
                        </InputGroup>
                    </Col>
                    </Row>
                </div>
                </Col>
            </Row>

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
                    dispatch(addAssignment(assignment));
                    router.push(`/Courses/${cid}/Assignments`);
                }}
                >
                Save
                </Button>
            </div>
        </div>
);}
