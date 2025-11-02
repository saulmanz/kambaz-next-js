"use client"
import { ReactNode, useState } from "react";
import CourseNavigation from "./navigation";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { FaAlignJustify } from "react-icons/fa";
import Breadcrumb from "./Breadcrumb";
import { Button, Collapse } from "react-bootstrap";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const course = courses.find((course: any) => course._id === cid);
  const [open, setOpen] = useState(true);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <Button
          variant=""
          onClick={() => setOpen(!open)}
          aria-controls="wd-sidebar"
          aria-expanded={open}
        >
        <FaAlignJustify className="me-4 fs-4 mb-1 text-danger" />
        </Button>
        {course?.name}
          </h2> <hr />
          
        <div className="d-flex">          
            <Collapse in={open}>

          <div id="wd-sidebar" className="p-3" style={{ width: "250px" }}>

              <CourseNavigation />
          </div>
            </Collapse>
          <div className="flex-fill">
            {children}
          </div></div>
    </div>
  );
}
