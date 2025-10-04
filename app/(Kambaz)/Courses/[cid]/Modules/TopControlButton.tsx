import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaPlus } from "react-icons/fa";
export default function TopControlButton() {
  return (
    <div className="float-end">
    <GreenCheckmark />
    <FaPlus className="ms-2" />
    <IoEllipsisVertical className="fs-4 ms-2" />
    </div>
 );}