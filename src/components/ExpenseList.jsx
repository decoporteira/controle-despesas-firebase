export default function ExpenseList({ expenses }) {
  if (expenses.length === 0) {
    return <p className="mt-4 text-gray-500">Nenhuma despesa adicionada.</p>;
  }

  return (
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
          </li>
        );
      })}
    </ul>
  );
}
