import { ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import TopControlButton from "./TopControlButton";

export default function Modules() {
  return (
    <div>
      <ModulesControls /><br /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary"><BsGripVertical/> Week 1 <TopControlButton /></div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-lesson p-3 ps-1">
               <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES <LessonControlButtons /> 
              </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" /> Introduction to the course <LessonControlButtons />
              </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3"/>Learn what is Web Development <LessonControlButtons /> </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
        
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary"><BsGripVertical/> Week 2 </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <BsGripVertical/> LESSON 1 </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <BsGripVertical/> LESSON 2 </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>

);}
