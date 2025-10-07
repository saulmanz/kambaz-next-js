// import { ListGroup, ListGroupItem, Nav, NavItem, NavLink } from "react-bootstrap";
// import Link from "next/link";
// import { Bs1Circle, BsClipboard2, BsFillGearFill, Bs2Circle, Bs3Circle, BsGithub, BsGit  } from "react-icons/bs";
// export default function TOC() {
//  return (
//    <ListGroup id="wd-kambaz-navigation">
//      <ListGroupItem className="border-0 bg-black text-center">
//       <Link href="/Labs" id="wd-labs" className="text-white text-decoration-none">
//         <BsFillGearFill className="fs-1 text-white" />
//         <br/>
//         Labs
//       </Link>
//      </ListGroupItem>
//      <ListGroupItem className="border-0 bg-black text-center">
//       <Link href="/Lab1" id="wd-labs" className="text-white text-decoration-none">
//         <Bs1Circle className="fs-1 text-white" />
//         <br/>
//         Lab 1
//       </Link>
//      </ListGroupItem>

//      <ListGroupItem className="border-0 bg-black text-center">
//       <Link href="/Lab2" id="wd-labs" className="text-white text-decoration-none">
//         <Bs2Circle className="fs-1 text-white" />
//         <br/>
//         Lab 2
//       </Link>
//      </ListGroupItem>

//      <ListGroupItem className="border-0 bg-black text-center">
//       <Link href="/Lab3" id="wd-labs" className="text-white text-decoration-none">
//         <Bs3Circle className="fs-1 text-white" />
//         <br/>
//         Lab 3
//       </Link>
//      </ListGroupItem>

//      <ListGroupItem className="border-0 bg-black text-center">
//       <Link href="/" id="wd-labs" className="text-white text-decoration-none">
//         <BsClipboard2 className="fs-1 text-white" />
//         <br/>
//         Kambaz
//       </Link>
//      </ListGroupItem>

//      <ListGroupItem className="border-0 bg-black text-center">
//       <Link href="https://github.com/saulmanz" id="wd-labs" className="text-white text-decoration-none">
//         <BsGithub className="fs-1 text-white" />
//         <br/>
//         Github
//       </Link>
//      </ListGroupItem>
//    </ListGroup>
// );}

import { Nav, NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";
export default function TOC() {
 return (
   <Nav variant="pills">
     <NavItem>
       <NavLink href="/Labs" as={Link}>Labs</NavLink>
     </NavItem>
     <NavItem>
       <NavLink href="/Labs/Lab1" as={Link}>Lab 1</NavLink>
     </NavItem>
     <NavItem>
       <NavLink href="/Labs/Lab2" as={Link}>Lab 2</NavLink>
     </NavItem>
     <NavItem>
       <NavLink href="/Labs/Lab3" as={Link}>Lab 3</NavLink>
     </NavItem>
     <NavItem>
       <NavLink href="/" as={Link}>Kambaz</NavLink>
     </NavItem>
     <NavItem>
       <NavLink href="https://github.com/saulmanz">My GitHub</NavLink>
     </NavItem>
   </Nav>
);}