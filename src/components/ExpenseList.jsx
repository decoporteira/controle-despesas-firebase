import { deleteExpense } from "../services/firebaseDB";

export default function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return <p className="mt-4 text-gray-500">Nenhuma despesa adicionada.</p>;
  }

  const handleDelete = async (expenseId) => {
    try {
      await deleteExpense(expenseId);
      if (onDelete) {
        onDelete(expenseId);
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mt-6 mb-4">
          Total: R$ {total.toFixed(2)}
        </h2>
      </div>
      <ul className="mt-4 space-y-2">
        {expenses.map((expense, index) => {
          const adjustedDate = new Date(expense.date);
          adjustedDate.setDate(adjustedDate.getDate() + 1);

          return (
            <li
              key={index}
              className="bg-white shadow p-3 rounded flex justify-between"
            >
              <div>
                <p className="font-bold text-xl">{expense.description}</p>
                <p className="text-sm text-gray-500">
                  {adjustedDate.toLocaleDateString()}
                </p>
              </div>
              <span className="font-bold text-red-600">
                - R$ {expense.amount.toFixed(2)}
              </span>
              <button
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={() => handleDelete(expense.id)}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
