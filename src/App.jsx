import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase.js";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Carregando...</p>;
  return (
    <>
      <Navbar user={auth.currentUser} />
      <Routes>
        <Route path="/" element={!user ? <Login /> : <Dashboard />} />
        <Route path="/login" element={user ? <Dashboard /> : <Login />} />
        <Route path="/signup" element={user ? <Dashboard /> : <Signup />} />
      </Routes>
    </>
  );
}

export default App;
