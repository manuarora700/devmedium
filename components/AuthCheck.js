import { UserContext } from "@lib/context";
import Link from "next/link";
import { useContext } from "react";

// Components children only shown to logged in users
export default function AuthCheck(props) {
  const { username } = useContext(UserContext);

  return username
    ? props.children
    : props.fallback || (
        <Link href="/enter">
          <a>You must be signed in</a>
        </Link>
      );
}
