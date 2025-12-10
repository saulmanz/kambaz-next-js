"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { setCurrentUser, setSignInRole } from "../reducer";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import * as client from "../client";
import { FormControl, Button } from "react-bootstrap";

export default function Signin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const signInRole = useSelector((state: any) => state.accountReducer.signInRole);

  const signin = async () => {
    const user = await client.signin(credentials, signInRole);
    if (!user) {
      alert("Invalid username or password");
      return;
    }
    dispatch(setCurrentUser(user));
    redirect("/Dashboard");
  };

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>

      {/* --- ROLE TOGGLE BUTTONS --- */}
      <div className="d-flex gap-2 mb-3">
        <Button
          variant={signInRole === "student" ? "primary" : "secondary"}
          onClick={() => dispatch(setSignInRole("student"))}
          className="w-50"
        >
          Student
        </Button>

        <Button
          variant={signInRole === "faculty" ? "primary" : "secondary"}
          onClick={() => dispatch(setSignInRole("faculty"))}
          className="w-50"
        >
          Faculty
        </Button>
      </div>

      <FormControl
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        className="mb-2"
        placeholder="username"
        id="wd-username"
      />

      <FormControl
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        className="mb-2"
        placeholder="password"
        type="password"
        id="wd-password"
      />

      <Button onClick={signin} id="wd-signin-btn" className="w-100 mb-2">
        Sign in
      </Button>

      <Link
        id="wd-signup-btn"
        href="/Account/Signup"
        className="btn btn-primary w-100"
      >
        Sign up
      </Link>
    </div>
  );
}
