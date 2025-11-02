"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";

interface AccountState {
  currentUser: { username: string } | null;
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
          <NavLink
            as={Link}
            href={`/${link.toLowerCase()}`}
            active={pathname.endsWith(link.toLowerCase())}
          >
            {link}
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
}
