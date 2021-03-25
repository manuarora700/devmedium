import { auth, googleAuthProvider } from "../lib/firebase";
import { useContext } from "react";
import { UserContext } from "../lib/context";

export default function EnterPage({}) {
  const { user, username } = useContext(UserContext);

  // 1. user signed in -> <SignOutButton />
  // 2. user signed in, but missing username -> <UsernameForm />
  // 3. user signed out -> <SignInButton />
  return (
    <main>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
}

// Sign in
function SignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };
  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src={`/google.png`} /> Sign in with Google
    </button>
  );
}

// Sign in Out
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

function UsernameForm() {
  return <div>username Form</div>;
}
