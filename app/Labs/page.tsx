import Link from "next/link";
import { Container } from "react-bootstrap";
export default function Labs() {
 return (
   <Container>
    <div id="wd-labs">
      <h1>Saul Manzanares</h1>
      <p>Section: 202610</p>
      <Link href="https://github.com/saulmanz/kambaz-next-js" id="wd-repo-link">Repo</Link>

      <h1>Labs</h1>
      <ul>
        <li>
          <Link href="/Labs/Lab1" id="wd-lab1-link">
            Lab 1: HTML Examples </Link>
        </li>
        <li>
          <Link href="/Labs/Lab2" id="wd-lab2-link">
            Lab 2: CSS Basics </Link>
        </li>
        <li>
          <Link href="/Labs/Lab3" id="wd-lab3-link">
            Lab 3: JavaScript Fundamentals </Link>
        </li>
        <li>
          <Link href="/Labs/Lab4" id="wd-lab3-link">
            Lab 4: Maintaining State in React Applications </Link>
        </li>
        <li>
          <Link href="/Labs/Lab5" id="wd-lab3-link">
            Lab 5: Implementing RESTful Web APIs with Express.js </Link>
        </li>
        <li>
          <Link href="/" id="wd-lab3-link">
            Kambaz </Link>
        </li>
      </ul>
    </div>
   </Container>
);}
