import { useEffect, useState } from "react";
import { useGroup } from "../providers/GroupProvider";
import { useParams } from "react-router-dom";
import { firebase_date_converter } from "../utils/function";
import CreateExpenseButton from "../components/button/CreateExpenseButton";
import CreateExpense from "../components/CreateExpense";
import { useExpense } from "../providers/ExpenseProvider";
import ExpenseList from "../components/expense/ExpenseList";
import { useAuth } from "../providers/AuthProvider";
import { useMessage } from "../providers/MessageProvider";
import { MessageType } from "../utils/enum";

const Group = () => {
  const { id } = useParams<{ id: string }>();
  const [isOpen, setIsOpen] = useState(false);
  const { getGroupById, loading, group } = useGroup();
  const { expenses } = useExpense();
  const { handleSetMessage } = useMessage();
  const { user } = useAuth();

  useEffect(() => {
    if (!id || loading) return;
    console.log("get group");
    getGroupById(id);
  }, [id, loading]);

  const calculateTotal = () => {
    if (!expenses || expenses.length === 0 || !user) return 0;
    let totalExpense = 0;
    expenses.forEach((expense) => {
      const amount = parseFloat(expense.amount);
      if (isNaN(amount)) return;

      if (expense.forWho.includes(user.email)) {
        const sum = amount / expense.forWho.length;
        console.log("sum", sum);
        totalExpense += sum;
      }
      if (expense.whoPaid === user.email) {
        totalExpense -= amount;
      }
    });
    return totalExpense;
  };

  const copyCode = () => {
    if (!group) return;
    navigator.clipboard.writeText(group.code);
    handleSetMessage("Code copied", MessageType.SUCCESS);
  };

  if (!group) return <h1>No Group</h1>;
  if (loading) return <h1>Loading</h1>;

  return (
    <div className="min-h-[calc(100vh-50px)] relative mb-12 mx-2 mt-4">
      <CreateExpense isOpen={isOpen} setIsOpen={setIsOpen} group={group} />
      <div className="bottom-2 right-5 fixed">
        <CreateExpenseButton setIsOpen={setIsOpen} />
      </div>
      <div className="flex flex-col px-6 py-2 shadow-md backdrop-saturate-200 backdrop-blur-2xl bg-opacity-80 border border-red-200/80 border-red-200 min-h-[200px] justify-between rounded-md bg-red-200">
        <div className=" font-extrabold text-2xl">
          {group.title} ({calculateTotal()})
        </div>
        <div className="flex flex-col">
          <label onClick={copyCode} className=" font-thin text-sm">
            code: {group.code}
          </label>
          <div className="text-sm">
            Create by: {group.creator} at
            {firebase_date_converter(group.createdAt)}
          </div>
        </div>
      </div>
      <div>{expenses && <ExpenseList expenseList={expenses} />}</div>
    </div>
  );
};
export default Group;
