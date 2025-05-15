import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import { useState, useEffect } from "react";
import { saveExpense, fetchExpenses } from "../services/firebaseDB";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const data = await fetchExpenses();
        setExpenses(data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    loadExpenses();
  }, []);

  const handleAddExpense = async (expense) => {
    try {
      await saveExpense(expense);
      setExpenses((prevExpenses) => [...prevExpenses, expense]);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };
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
        <button
          onClick={handleLogout}
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Logout
        </button>
        <ExpenseForm onSubmit={handleAddExpense} />
        <div>
          <h2 className="text-2xl font-bold mt-6 mb-4">Minhas Despesas</h2>
          <p className="text-gray-500">Aqui você pode ver suas despesas.</p>

          <ExpenseList expenses={expenses} />
        </div>
      </div>
    </div>
  );
}
