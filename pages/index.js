import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

export default function Home() {
  return (
    <div>
      {/* <Link
        prefetch={false}
        href={{
          pathname: "/[username]",
          query: { username: "manuarora28" },
        }}
      >
        <a>Manu's profile</a>
      </Link> */}
      {/* <Loader show /> */}
      <button onClick={() => toast.success("Hello Toast")}>Toast</button>
    </div>
  );
}
