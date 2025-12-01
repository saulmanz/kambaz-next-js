"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";

interface AccountState {
  currentUser: {
    role: string; username: string 
  } | null;
}

export default function AccountNavigation() {
  const { currentUser } = useSelector(
    (state: { accountReducer: AccountState }) => state.accountReducer
  );

  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const pathname = usePathname();

  return (
    <Nav variant="pills">
      {links.map((link) => (
        <NavItem key={link}>
        {currentUser && currentUser.role === "ADMIN" && (
       <NavLink as={Link} href={`/Account/Users`}  active={pathname.endsWith('Users')}> Users </NavLink> )}
        </NavItem>
      ))}
    </Nav>
  );
}
