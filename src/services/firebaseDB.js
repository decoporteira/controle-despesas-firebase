import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "./firebase";

export const saveExpense = async (expense) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Usuário não autenticado");

  const userExpensesRef = collection(db, "expenses", user.uid, "items");
  const docRef = await addDoc(userExpensesRef, expense);

  return { id: docRef.id, ...expense };
};

export const fetchExpenses = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("Usuário não autenticado");

  const userExpensesRef = collection(db, "expenses", user.uid, "items");
  const snapshot = await getDocs(userExpensesRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const deleteExpense = async (expenseId) => {
  console.log("Deleting expense with ID:", expenseId);
  const user = auth.currentUser;
  if (!user) throw new Error("Usuário não autenticado");

  const expenseRef = doc(db, "expenses", user.uid, "items", expenseId);
  await deleteDoc(expenseRef);
};
