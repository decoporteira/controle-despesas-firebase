import { collection, addDoc, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase";

// Salvar uma nova despesa
export const saveExpense = async (expense) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Usuário não autenticado");

  const userExpensesRef = collection(db, "expenses", user.uid, "items");
  await addDoc(userExpensesRef, expense);
};

// Buscar despesas salvas
export const fetchExpenses = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("Usuário não autenticado");

  const userExpensesRef = collection(db, "expenses", user.uid, "items");
  const snapshot = await getDocs(userExpensesRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
