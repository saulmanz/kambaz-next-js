import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
export default function PeopleTable() {
 return (
  <div id="wd-people-table">
   <Table striped>
    <thead>
     <tr><th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th></tr>
    </thead>
    <tbody>
     <tr><td className="wd-full-name text-nowrap">
          <FaUserCircle className="me-2 fs-1 text-secondary" />
          <span className="wd-first-name">Tony</span>{" "}
          <span className="wd-last-name">Stark</span></td>
      <td className="wd-login-id">001234561S</td>
      <td className="wd-section">S101</td>
      <td className="wd-role">STUDENT</td>
      <td className="wd-last-activity">2020-10-01</td>
      <td className="wd-total-activity">10:21:32</td></tr>


     <tr><td className="wd-full-name text-nowrap">
          <FaUserCircle className="me-2 fs-1 text-secondary" />
          <span className="wd-first-name">Alice</span>{" "}
          <span className="wd-last-name">Johnson</span></td>
      <td className="wd-login-id">928374615A</td>
      <td className="wd-section">S101</td>
      <td className="wd-role">STUDENT</td>
      <td className="wd-last-activity">2025-10-01</td>
      <td className="wd-total-activity">12:35:09</td></tr>

     <tr><td className="wd-full-name text-nowrap">
          <FaUserCircle className="me-2 fs-1 text-secondary" />
          <span className="wd-first-name">Marcus</span>{" "}
          <span className="wd-last-name">Lee</span></td>
      <td className="wd-login-id">472839105B</td>
      <td className="wd-section">S101</td>
      <td className="wd-role">STUDENT</td>
      <td className="wd-last-activity">2020-10-03</td>
      <td className="wd-total-activity">27:10:19</td></tr>

     <tr><td className="wd-full-name text-nowrap">
          <FaUserCircle className="me-2 fs-1 text-secondary" />
          <span className="wd-first-name">Sophia</span>{" "}
          <span className="wd-last-name">Martinez</span></td>
      <td className="wd-login-id">183947526C</td>
      <td className="wd-section">S101</td>
      <td className="wd-role">INSTRUCTOR</td>
      <td className="wd-last-activity">2020-10-01</td>
      <td className="wd-total-activity">89:55:59</td></tr>
    </tbody>
   </Table>
  </div> );}