import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        navigate("/login");
      })
      .catch((error) => {
        setError(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
      {error && <p className="text-red-500">{error.message}</p>}
      <form onSubmit={submit} className="bg-white p-6 rounded shadow-md w-96">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full mb-4"
          placeholder="Enter your email"
        />
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full mb-4"
          placeholder="Enter your password"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Criar Conta
        </button>
      </form>
      <p className="text-sm text-gray-600 mt-4">
        Já tem uma conta?{" "}
        <NavLink
          to="/login"
          className="text-blue-600 hover:underline hover:text-blue-800 font-medium"
        >
          Entrar
        </NavLink>
      </p>
    </div>
  );
}
