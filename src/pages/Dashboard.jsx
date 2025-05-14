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
    <div className="flex flex-col items-center pt-10 h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-200">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}
