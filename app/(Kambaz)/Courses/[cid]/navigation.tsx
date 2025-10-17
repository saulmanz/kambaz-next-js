"use client";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
export default function CourseNavigation() {
  const pathname = usePathname(); 
  const { cid } = useParams();
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
        {links.map((link) => {
          const href = `/Courses/${cid}/${link}`;
          const active = pathname === href;
          return (
            <Link
              key={link}
              href={href}
              className={`list-group-item border-0 ${active ? "active" : "text-danger"}`}>
              {link}
            </Link>
          );
        })}
      </div>
);}
