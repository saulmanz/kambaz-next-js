import { BsExclamationCircle } from "react-icons/bs";
import { BsCheckCircle } from "react-icons/bs";
import { BsDownload } from "react-icons/bs";
import { LiaFileImportSolid } from "react-icons/lia";
import { Button } from "react-bootstrap";
import { BsHouseDoorFill } from "react-icons/bs";
import { BsFillMegaphoneFill } from "react-icons/bs";
import { BsBarChartLineFill } from "react-icons/bs";
import { BsBellFill } from "react-icons/bs";

export default function CourseStatus() {
 return (
   <div id="wd-course-status" style={{ width: "350px" }}>
     <h2>Course Status</h2>
     <div className="d-flex">
       <div className="w-50 pe-1">
         <Button variant="secondary" size="lg" className="w-100 text-nowrap ">
           <BsExclamationCircle className="me-2 fs-5" /> Unpublish </Button> </div>
       <div className="w-50">
         <Button variant="success" size="lg" className="w-100">
           <BsCheckCircle  className="me-2 fs-5" /> Publish </Button> </div>
     </div>
     <br />
     <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
       <BsDownload className="me-2 fs-5" /> Import Existing Content </Button>
     <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
       <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons </Button>

     <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
       <BsHouseDoorFill className="me-2 fs-5" /> Choose Home Page </Button>
     <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
       <BsBarChartLineFill className="me-2 fs-5" /> View Course Stream </Button>

     <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
       <BsFillMegaphoneFill className="me-2 fs-5" /> New Announcement </Button>

     <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
       <BsBarChartLineFill className="me-2 fs-5" /> New Analytics </Button>

     <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
       <BsBellFill className="me-2 fs-5" /> View Course Notifications </Button>
   </div> );}