import { useMemo, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { firebase_date_converter } from "../../utils/function";
import { UserIcon } from "@heroicons/react/20/solid";
import ExpenseDetails from "../../pages/ExpenseDetails";
import { ExpenseType } from "../../providers/ExpenseProvider";
import { Chip } from "@material-tailwind/react";

type ExpenseListByDate = {
  [key: string]: ExpenseType[];
};

const ExpenseList = (props: { expenseList: Array<ExpenseType> }) => {
  const { expenseList } = props;
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<ExpenseType | null>(
    null
  );

  // modify the expenseList to group by date
  const expenseListByDate = useMemo(() => {
    // First, group the expenses by date
    const groupedByDate = expenseList.reduce((acc, expense) => {
      const date = firebase_date_converter(expense.date);
      if (acc[date]) {
        // acc[date].push(expense);
        acc[date] = [expense, ...acc[date]];
      } else {
        acc[date] = [expense];
      }
      return acc;
    }, {});

    // Then, sort the keys (dates) in descending order
    const sortedDates = Object.keys(groupedByDate).sort((a, b) => {
      // Assuming 'firebase_date_converter' returns a string in 'YYYY-MM-DD' format
      return new Date(b).valueOf() - new Date(a).valueOf(); // This will sort in descending order
    });

    // Construct a new object with sorted dates
    const sortedExpenses: ExpenseListByDate = {};
    sortedDates.forEach((date: string) => {
      sortedExpenses[date] = groupedByDate[date];
    });

    return sortedExpenses;
  }, [expenseList]);

  function closeModal() {
    setIsOpen(false);
  }

  const onClickExpense = (expense: ExpenseType) => {
    setSelectedExpense(expense);
    setIsOpen(true);
  };

  const Expense = (props: {
    expense: ExpenseType;
    onClick: (arg: string) => void;
  }) => {
    const { expense, onClick } = props;
    return (
      <div
        onClick={() => onClick(expense.id)}
        className="grid grid-cols-7 border-2 my-2 px-2 rounded-2xl shadow-md py-4 cursor-pointer"
      >
        <div className="flex flex-col col-span-5 gap-1">
          <div className="flex flex-row">
            <span className="line-clamp-1">
              {expense.title}
            </span>
          </div>
          <div>
            <div className="flex gap-2 items-end flex-wrap w-full h-fit">
              {expense.tags &&
                expense.tags.length > 0 &&
                expense.tags.map((tag: string) => {
                  return <Chip size="sm" key={tag} color="blue" value={tag} />;
                })}
            </div>
          </div>
        </div>
        <div className="flex text-gray-700 col-span-1 items-center justify-center">
          <UserIcon width={20} height={20} />
          {expense.forWho && expense.forWho.length > 0
            ? expense.forWho.length
            : 0}
        </div>

        <div className="flex col-span-1 items-center justify-center">
          {expense.whoPaid === user?.email ? (
            <div className="text-green-300">${expense.amount}</div>
          ) : (
            <>
              {expense.forWho.includes(user?.email) ? (
                <>
                  <div className="text-red-300">
                    ${expense.amount / expense.forWho.length}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-red-300">/</div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="">
      {isOpen && (
        <ExpenseDetails
          isOpen={isOpen}
          closeModal={closeModal}
          selectedExpense={selectedExpense}
        />
      )}

      {expenseListByDate &&
        Object.keys(expenseListByDate).map((date, idx) => {
          return (
            <div key={idx} className="mb-10">
              <div className="font-bold">{date}</div>
              {expenseListByDate[date].map(
                (expense: ExpenseType, idx: number) => {
                  return (
                    <Expense
                      key={idx}
                      expense={expense}
                      onClick={() => onClickExpense(expense)}
                      // onClickExpense={onClickExpense}
                    />
                  );
                }
              )}
            </div>
          );
        })}
    </div>
  );
};

export default ExpenseList;
