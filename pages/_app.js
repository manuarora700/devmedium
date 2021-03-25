import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";

function MyApp({ Component, pageProps }) {
  // custom hook for managing auth and getting user, username
  const userData = useUserData();
  return (
    <UserContext.Provider value={userData}>
      <Navbar />

      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp;
