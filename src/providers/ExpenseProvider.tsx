import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  PropsWithChildren,
} from "react";
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { useAuth } from "./AuthProvider";
import { useMessage } from "./MessageProvider";
import { useGroup } from "./GroupProvider";
import { v4 as uuidv4 } from "uuid";
import { MessageType } from "../utils/enum";

export type CreateExpenseType = {
  title: string;
  amount: number;
  currency: string;
  description?: string;
  whoPaid: string;
  forWho: Array<string>;
};
export type ExpenseContextType = {
  expenses: Array<ExpenseType>;
  expense: DocumentData | undefined;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  getExpenses: () => Promise<DocumentData | null>;
  createExpense: (data: CreateExpenseType) => Promise<void>;
  getExpenseById: (id: string) => Promise<DocumentData | undefined>;
};

export interface ExpenseType extends DocumentData {}

const ExpenseContext = createContext<ExpenseContextType>({
  loading: false,
  setLoading: () => {},
  expenses: [],
  expense: undefined,
  createExpense: async () => {},
  getExpenses: async () => null,
  getExpenseById: async () => Document,
});

export const useExpense = () => {
  return useContext(ExpenseContext);
};

const ExpenseProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [expenses, setExpenses] = useState<Array<DocumentData>>([]);
  const [expense, setExpense] = useState<DocumentData | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { group } = useGroup();
  const { handleSetMessage } = useMessage();

  useEffect(() => {
    setLoading(true);
    if (group) {
      getExpenses();
    }
    setLoading(false);
  }, [group]);

  const createExpense = async (data: CreateExpenseType) => {
    try {
      setLoading(true);
      if (!group) return;
      const expenseRef = doc(db, "expenses", group.expense_id);
      const expenseSnapshot = await getDoc(expenseRef);
      if (expenseSnapshot.exists()) {
        const expense = expenseSnapshot.data();
        // generate random ID store in firestore
        const id = uuidv4();
        if(data.whoPaid === ""){
          throw new Error("Please select who paid");
        }
        if(data.forWho.length === 0){
          throw new Error("Please select who paid for");
        }
        expense.expenses = [...expense.expenses, { ...data, id }];
        await updateDoc(expenseRef, expense);
      } else {
        throw new Error("Expense does not exist");
      }
    } catch (e) {
      if (e instanceof Error) {
        handleSetMessage(e.message, MessageType.ERROR);
      }
    } finally {
      setLoading(false);
    }
  };

  const getExpenses = async () => {
    if (!group) {
      return null;
    }
    const expenseRef = doc(db, "expenses", group.expense_id);
    const expenseSnapshot = await getDoc(expenseRef);
    const expenses = expenseSnapshot.data();
    if (!expenses) {
      return null;
    }
    setExpenses(expenses.expenses);
    return expenses;
  };

  const getExpenseById = async (id: string) => {
    console.log("expenses start");

    if (!user) {
      handleSetMessage("Please login first", MessageType.ERROR);
      return;
    }

    const expenseRef = collection(db, "expenses");
    // query expense by amount
    const q = query(expenseRef, where("expense", "array-contains", { id: id }));
    const expenseSnapshot = await getDocs(q);
    const expenses = expenseSnapshot.docs.map((doc: DocumentData) => {
      return { ...doc.data(), id: doc.id };
    });

    if (!expenses) return null;
    const expense = expenses.find((expense: ExpenseType) => {
      return expense.id === id;
    });

    if (!expense) return null;
    setExpense(expense);
    return expense;
  };

  const value = {
    expenses,
    expense,
    createExpense,
    getExpenses,
    getExpenseById,
    loading,
    setLoading,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

export default ExpenseProvider;
