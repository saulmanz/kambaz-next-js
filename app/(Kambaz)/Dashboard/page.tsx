import Link from "next/link";
import Image from "next/image";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from "react-bootstrap";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
    <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
    <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
    <div id="wd-dashboard-courses">
      <Row xs={1} md={4} className="g-4">
      <Col className="wd-dashboard-course" style={{ width: "300px" }}>
        <Card>
        <Link href="/Courses/1234/Home"
              className="wd-dashboard-course-link text-decoration-none text-dark">
          <CardImg variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
          <CardBody>
          <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1234 React JS</CardTitle>
          <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
            Full Stack software developer</CardText>
          <Button variant="primary">Go</Button>
          </CardBody>
        </Link>
        </Card>
      </Col>

      <Col className="wd-dashboard-course" style={{ width: "300px" }}> 
        <Card>
        <Link href="/Courses/1235/Home"
              className="wd-dashboard-course-link text-decoration-none text-dark">
          <CardImg variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
          <CardBody>
          <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1235 Advanced React JS</CardTitle>
          <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
            Super Full Stack software developer</CardText>
          <Button variant="primary">Go</Button>
          </CardBody>
        </Link>
        </Card>
      </Col>

      <Col className="wd-dashboard-course" style={{ width: "300px" }}> 
        <Card>
        <Link href="/Courses/1236/Home"
              className="wd-dashboard-course-link text-decoration-none text-dark">
          <CardImg variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
          <CardBody>
          <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1236 Expert React JS</CardTitle>
          <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
            Some Advanced Full Stack Adviced</CardText>
          <Button variant="primary">Go</Button>
          </CardBody>
        </Link>
        </Card>
      </Col>

      <Col className="wd-dashboard-course" style={{ width: "300px" }}> 
        <Card>
        <Link href="/Courses/1236/Home"
              className="wd-dashboard-course-link text-decoration-none text-dark">
          <CardImg variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
          <CardBody>
          <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1236 Expert React JS</CardTitle>
          <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
            Some Advanced Full Stack Adviced</CardText>
          <Button variant="primary">Go</Button>
          </CardBody>
        </Link>
        </Card>
      </Col>

      <Col className="wd-dashboard-course" style={{ width: "300px" }}> 
        <Card>
        <Link href="/Courses/1236/Home"
              className="wd-dashboard-course-link text-decoration-none text-dark">
          <CardImg variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
          <CardBody>
          <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1236 Expert React JS</CardTitle>
          <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
            Some Advanced Full Stack Adviced</CardText>
          <Button variant="primary">Go</Button>
          </CardBody>
        </Link>
        </Card>
      </Col>

      <Col className="wd-dashboard-course" style={{ width: "300px" }}> 
        <Card>
        <Link href="/Courses/1236/Home"
              className="wd-dashboard-course-link text-decoration-none text-dark">
          <CardImg variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
          <CardBody>
          <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1236 Expert React JS</CardTitle>
          <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
            Some Advanced Full Stack Adviced</CardText>
          <Button variant="primary">Go</Button>
          </CardBody>
        </Link>
        </Card>
      </Col>

      <Col className="wd-dashboard-course" style={{ width: "300px" }}> 
        <Card>
        <Link href="/Courses/1236/Home"
              className="wd-dashboard-course-link text-decoration-none text-dark">
          <CardImg variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
          <CardBody>
          <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1236 Expert React JS</CardTitle>
          <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
            Some Advanced Full Stack Adviced</CardText>
          <Button variant="primary">Go</Button>
          </CardBody>
        </Link>
        </Card>
      </Col>

      </Row>
    </div></div>
);}
