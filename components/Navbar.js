import Link from "next/link";

import { useContext } from "react";
import { UserContext } from "../lib/context";

export default function Navbar() {
  const { user, username } = useContext(UserContext);
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn-logo">FEED</button>
          </Link>
        </li>

        {/* User is signed in and has a username */}
        {username && (
          <>
            <li className="push-left">
              <Link href="/admin">
                <button className="btn-blue">Write Posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img src={user?.photoURL} />
              </Link>
            </li>
          </>
        )}
        {/* User is not signed in OR does not have a username */}
        {!username && (
          <Link href="/enter">
            <button className="btn-blue">Login</button>
          </Link>
        )}
      </ul>
    </nav>
  );
}
