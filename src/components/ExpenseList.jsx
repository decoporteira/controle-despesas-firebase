export default function ExpenseList({ expenses }) {
  if (expenses.length === 0) {
    return <p className="mt-4 text-gray-500">Nenhuma despesa adicionada.</p>;
  }

  return (
    <ul className="mt-4 space-y-2">
      {expenses.map((expense, index) => (
        <li
          key={index}
          className="bg-white shadow p-3 rounded flex justify-between"
        >
          <div>
            <p className="font-medium">{expense.description}</p>
            <p className="text-sm text-gray-500">
              {new Date(expense.date).toLocaleDateString()}
            </p>
          </div>
          <span className="font-bold text-green-600">R$ {expense.amount}</span>
        </li>
      ))}
    </ul>
  );
}
