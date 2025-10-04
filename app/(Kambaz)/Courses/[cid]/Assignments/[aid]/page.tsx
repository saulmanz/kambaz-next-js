import Link from "next/link";
import { Button, Col, FormCheck, FormControl, FormLabel, FormSelect, InputGroup, Row } from "react-bootstrap";
import { BsCalendar3 } from "react-icons/bs";
import { BsXLg } from "react-icons/bs";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <FormLabel> Assignment Name </FormLabel>
      <FormControl as="textarea" rows={1} /><br /><br />

      <FormControl as="textarea" rows={10} 
        defaultValue="Complete all the Lab exercises and Kambaz exercises described in Chapter 1 of

        Developing Full Stack Next.js Web ApplicationsLinks to an external site.

        Submit a link to the landing page of your Web application running on Vercel.

        The landing page should be the Kambaz application with a link to the Lab exercises.

        Lab 1 should be the landing page of the Lab exercises and should include the following:

        Your full name and section
        Links to each of the lab assignments
        Link to the Kambaz application
        Links to all relevant source code repositories
        The Kambaz application should include a link to navigate back to the landing page."/>

      <br />

      <Row className="mb-3" controlId="points">
          <FormLabel column sm={2}> Points</FormLabel>
          <Col sm={10}>
              <FormControl type="wd-points" defaultValue="100" />
          </Col>
      </Row>
      <Row className="mb-3" controlId="assignment-group">
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
      <Row className="mb-3" controlId="textarea2">
          <FormLabel column sm={2}> Display Grade as </FormLabel>
          <Col sm={10}>
            <FormSelect>
              <option value="PERCENTAGE" defaultChecked>PERCENTAGE</option>
              <option value="PROJECTS">PROJECTS</option>
            </FormSelect>
          </Col>
      </Row>
      <Row className="mb-3" controlId="textarea2">
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

      <Row className="mb-2" controlID="due-date">
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
              defaultValue="2024-05-13"/>
              <InputGroup.Text><BsCalendar3 /></InputGroup.Text>
            </InputGroup>

            <Row>
              <Col>
                <FormLabel column sm={3}> Available From </FormLabel>
                <InputGroup>
                  <input type="date" className="form-control" 
                  id="wd-available-from"
                  defaultValue="2024-05-06"/>
                  <InputGroup.Text><BsCalendar3 /></InputGroup.Text>
                </InputGroup>
              </Col>
              <Col>
                <FormLabel column sm={2}> Until </FormLabel>
                <InputGroup>
                  <input type="date" className="form-control" 
                  id="wd-available-unti"
                  defaultValue="2024-05-20"/>
                  <InputGroup.Text><BsCalendar3 /></InputGroup.Text>
                </InputGroup>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <hr />
      <div className="d-flex gap-2 ms-3 float-end">
        <Link href="/Courses/1234/Assignments">
          <Button variant="secondary" size="lg">
            Cancel
          </Button>
        </Link>
        <Link href="/Courses/1234/Assignments">
          <Button variant="danger" size="lg">
            Save
          </Button>
        </Link>
      </div>
    </div>
);}
