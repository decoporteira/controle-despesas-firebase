import { useState } from "react";

export default function ExpenseForm({ onSubmit }) {
  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!expense || !amount || !date) {
      setError({ message: "Por favor, preencha todos os campos." });
      return;
    }
    if (isNaN(amount) || amount <= 0) {
      setError({ message: "Por favor, insira um valor válido." });
      return;
    }
    const newExpense = {
      description: expense,
      amount: parseFloat(amount),
      date,
    };

    onSubmit(newExpense);

    setExpense("");
    setAmount("");
    setDate("");
    setError(null);
  };

  return (
    <>
      {error && <p className="text-red-500">{error.message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="border border-gray-300 rounded p-2 w-full mb-4"
          placeholder="Enter expense description"
          value={expense}
          onChange={(e) => setExpense(e.target.value)}
        ></input>
        <input
          type="number"
          className="border border-gray-300 rounded p-2 w-full mb-4"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        ></input>
        <input
          type="date"
          className="border border-gray-300 rounded p-2 w-full mb-4"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        ></input>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Add Expense
        </button>
      </form>
    </>
  );
}
