import Link from "next/link";
export default function TOC() {
 return (
   <ul>
     <li>
       <Link href="/" >
         Home </Link>
     </li>
     <li>
       <Link href="/Lab1" id="wd-lab1-link">
         Lab 1 </Link>
     </li>
     <li>
       <Link href="/Lab2" id="wd-lab2-link">
         Lab 2 </Link>
     </li>
     <li>
       <Link href="/Lab3" id="wd-lab3-link">
         Lab 3 </Link>
     </li>
     <li>
       <Link href="/Kambaz" id="wd-lab3-link">
         Kambaz </Link> 
     </li>
   </ul>
);}
