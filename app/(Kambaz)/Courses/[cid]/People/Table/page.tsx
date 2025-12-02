"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./PeopleTable";

export default function PeopleTablePage() {
  const params = useParams();
  const cid = params.cid;

  const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
  const USERS_API = `${HTTP_SERVER}/api/courses/${cid}/users`;

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch(USERS_API);
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    if (cid) fetchUsers();
  }, [cid]);

  return (
    <div>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
