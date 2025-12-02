"use client";
import { useEffect, useState } from "react";
import PeopleTable from "./PeopleTable";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PeopleTablePage({ params }: { params: { cid: string } }) {
  const { cid } = params;

  const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
  const USERS_API = `${HTTP_SERVER}/api/courses/${cid}/users`;

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch(USERS_API);
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return (
    <div>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
