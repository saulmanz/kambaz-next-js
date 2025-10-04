import Link from "next/link";
import { FormControl, FormSelect } from "react-bootstrap";
export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <FormControl id="wd-username"
             defaultValue="alice"
             placeholder="username"
             className="mb-2"/>
      <FormControl id="wd-password"
             defaultValue="123"
             placeholder="password"
            //  type="password"
             className="mb-2"/>
      <FormControl id="wd-firstname"
             defaultValue="Alice"
             placeholder="First Name"
             className="mb-2"/>
      <FormControl id="wd-lastname"
             defaultValue="Wonderland"
             placeholder="Last Name"
             className="mb-2"/>
      <input type="date" className="form-control mb-2" 
        id="wd-available-from"/>

      <FormControl id="wd-email"
             defaultValue="alice@wonderland"
             placeholder="Email"
             type="email"
             className="mb-2"/>
      <FormSelect className="mb-2" defaultValue="FACULTY" id="wd-role">
        <option value="USER">User</option>       <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option> <option value="STUDENT">Student</option>
      </FormSelect>

      <Link href="Signin" className="btn btn-danger w-100 mb-2" > Sign out </Link>
    </div>
);}
