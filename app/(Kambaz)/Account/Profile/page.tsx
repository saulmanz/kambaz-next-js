/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { Button, FormControl } from "react-bootstrap";
import * as client from "../client";

interface Profile {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  role: "USER" | "ADMIN" | "FACULTY" | "STUDENT";
}

interface AccountState {
  currentUser: Profile | null;
}

export default function Profile() {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: { accountReducer: AccountState }) => state.accountReducer.currentUser
  );

  const [profile, setProfile] = useState<Profile | null>(null);

  // Sync profile state with Redux currentUser
  useEffect(() => {
    if (!currentUser) return redirect("/Account/Signin");
    setProfile(currentUser);
  }, [currentUser]);

  const handleChange = (key: keyof Profile, value: any) => {
    if (!profile) return;
    setProfile({ ...profile, [key]: value });
  };

  const updateProfile = async () => {
    if (!profile) return;
    try {
      const updatedProfile = await client.updateUser(profile);
      dispatch(setCurrentUser(updatedProfile)); // update Redux
      setProfile(updatedProfile); // update local state immediately
      alert("Profile updated successfully!");
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      alert("Failed to update profile");
    }
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    redirect("/Account/Signin");
  };

  if (!profile) return null; // wait until profile is loaded

  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>

      <FormControl
        className="mb-2"
        value={profile.username}
        onChange={(e) => handleChange("username", e.target.value)}
      />
      <FormControl
        className="mb-2"
        type="password"
        value={profile.password}
        onChange={(e) => handleChange("password", e.target.value)}
      />
      <FormControl
        className="mb-2"
        value={profile.firstName}
        onChange={(e) => handleChange("firstName", e.target.value)}
      />
      <FormControl
        className="mb-2"
        value={profile.lastName}
        onChange={(e) => handleChange("lastName", e.target.value)}
      />
      <FormControl
        className="mb-2"
        type="date"
        value={profile.dob}
        onChange={(e) => handleChange("dob", e.target.value)}
      />
      <FormControl
        className="mb-2"
        type="email"
        value={profile.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />
      <select
        className="form-control mb-2"
        value={profile.role}
        onChange={(e) => handleChange("role", e.target.value as Profile["role"])}
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>

      <button onClick={updateProfile} className="btn btn-primary w-100 mb-2">
        Update
      </button>
      <Button onClick={signout} className="w-100 mb-2">
        Sign out
      </Button>
    </div>
  );
}
