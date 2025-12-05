import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash, FaBan } from "react-icons/fa";
export default function LessonControlButtons(
    { quizID, deleteQuiz }: { 
    quizID: string;
    deleteQuiz: (moduleId: string) => void;} 
) {
  return (
    <div className="float-end">
      <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteQuiz(quizID)}/>
      {/* TODO: Make it so that if its before current day it uses FaBan */}
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div> );}