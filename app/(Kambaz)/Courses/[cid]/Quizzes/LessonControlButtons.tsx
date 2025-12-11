"use client";
import { useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash, FaBan, FaCheck, FaEdit } from "react-icons/fa";
import GreenCheckmark from "./GreenCheckmark";
import Link from "next/link";

export default function LessonControlButtons({
  quiz,
  deleteQuiz,
  togglePublish,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  quiz: any;
  deleteQuiz: (quizId: string) => void;
  togglePublish: (quizId: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="position-relative float-end">
      {/* Publish indicator */}
      {quiz.published ? <GreenCheckmark /> : <FaBan className="text-secondary me-2" />}

      {/* Context Menu Button */}
      <IoEllipsisVertical
        className="fs-4"
        style={{ cursor: "pointer" }}
        onClick={() => setOpen(!open)}
      />

      {/* Dropdown Menu */}
      {open && (
        <div
          className="position-absolute bg-white border rounded shadow p-2"
          style={{ right: 0, zIndex: 1000 }}
        >
          <Link
            href={`/Courses/${quiz.course}/Quizzes/${quiz._id}`}
            className="dropdown-item d-flex align-items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <FaEdit /> Edit
          </Link>

          <div
            className="dropdown-item d-flex align-items-center gap-2 text-danger"
            style={{ cursor: "pointer" }}
            onClick={() => {
              deleteQuiz(quiz._id);
              setOpen(false);
            }}
          >
            <FaTrash /> Delete
          </div>

          <div
            className="dropdown-item d-flex align-items-center gap-2"
            style={{ cursor: "pointer" }}
            onClick={() => {
              togglePublish(quiz._id);
              setOpen(false);
            }}
          >
            {quiz.published ? <FaBan /> : <FaCheck />}
            {quiz.published ? "Unpublish" : "Publish"}
          </div>
        </div>
      )}
    </div>
  );
}
