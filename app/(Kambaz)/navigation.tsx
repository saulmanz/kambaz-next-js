import { BsFillJournalBookmarkFill, BsSpeedometer } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";
import { BsCalendar2Week } from "react-icons/bs";
import { BsFillGearFill } from "react-icons/bs";
import { BsFillInboxesFill } from "react-icons/bs";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
export default function KambazNavigation() {
 return (
   <ListGroup className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2" style={{ width: 120 }}
              id="wd-kambaz-navigation">
     <ListGroupItem className="bg-black border-0 text-center" as="a"
              target="_blank" href="https://www.northeastern.edu/" id="wd-neu-link">
       <img src="/images/NEU.jpg" width="75px" alt="Northeastern University" />
     </ListGroupItem>
     <ListGroupItem className="border-0 bg-black text-center">
       <Link href="/Account" id="wd-account-link" className="text-white text-decoration-none">
         <BsPersonCircle className="fs-1 text-white" />
         <br />
         Account
       </Link>
     </ListGroupItem>
     <ListGroupItem className="border-0 bg-white text-center">
       <Link href="/Dashboard" id="wd-dashboard-link" className="text-danger text-decoration-none">
         <BsSpeedometer className="fs-1 text-danger" />
         <br />
         Dashboard
       </Link>
     </ListGroupItem>
     <ListGroupItem className="border-0 bg-black text-center">
       <Link href="/Courses" id="wd-courses-link" className="text-white text-decoration-none">
         <BsFillJournalBookmarkFill className="fs-1 text-white" />
         <br />
         Courses
       </Link>
     </ListGroupItem>
      <ListGroupItem className="border-0 bg-black text-center">
       <Link href="/Calendar" id="wd-calendar-link" className="text-white text-decoration-none">
         <BsCalendar2Week className="fs-1 text-white" />
         <br />
         Calendar
       </Link>
     </ListGroupItem>
      <ListGroupItem className="border-0 bg-black text-center">
       <Link href="/Inbox" id="wd-inbox-link" className="text-white text-decoration-none">
         <BsFillInboxesFill className="fs-1 text-white" />
         <br />
         Inbox
       </Link>
     </ListGroupItem>
      <ListGroupItem className="border-0 bg-black text-center">
       <Link href="/Labs" id="wd-labs-link" className="text-white text-decoration-none">
         <BsFillGearFill className="fs-1 text-white" />
         <br />
         Labs
       </Link>
     </ListGroupItem>
   </ListGroup>
);}
