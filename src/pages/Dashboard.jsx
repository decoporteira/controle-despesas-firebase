import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {});
  };

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </section>
  );
}
