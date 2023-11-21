import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useState } from "react";
import { Tab } from "@headlessui/react";
import Amount from "./expense/Amount";
import WhoPaid from "./expense/WhoPaid";
import PaidFor from "./expense/PaidFor";
import { useExpense } from "../providers/ExpenseProvider";
import { DocumentData } from "firebase/firestore";
import TagList from "./expense/TagList";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type ExpenseDataType = {
  title: string;
  amount: number;
  currency: string;
  description?: string;
  date: Date;
  tags: Array<string>;
};
const CreateExpense = (props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  group: DocumentData;
}) => {
  const { isOpen, setIsOpen, group } = props;
  const [error, setError] = useState<string>("");
  const [whoPaid, setWhoPaid] = useState<string>("");
  const [paidFor, setPaidFor] = useState<Array<string>>([]);

  const { createExpense, loading, getExpenses, setLoading } = useExpense();

  const [expenseData, setExpenseData] = useState<ExpenseDataType>({
    title: "",
    amount: 0,
    currency: group.currency,
    description: "",
    date: new Date(),
    tags: [],
  });

  const categories = ["Amount", "Categories", "Who Paid", "For Who"];

  function closeModal() {
    setIsOpen(false);
  }

  const checkData = useCallback(() => {
    const errorMessage: string = "";
    let error: boolean = false;
    if (!expenseData.title) {
      errorMessage.concat("Title is required");
      error = true;
    }
    if (!expenseData.amount) {
      errorMessage.concat("Amount is required");
      error = true;
    }
    if (!expenseData.currency) {
      errorMessage.concat("Currency is required");
      error = true;
    }
    setError(errorMessage);
    console.log(errorMessage);

    return error;
  }, [expenseData.amount, expenseData.currency, expenseData.title]);

  const onCreate = async () => {
    setLoading(true);
    const result = checkData();
    if (result) {
      setError("Please fill all the required field");
      setLoading(false);
      return;
    }
    const create_expense_data = {
      ...expenseData,
      whoPaid: whoPaid,
      forWho: paidFor,
    };
    await createExpense(create_expense_data);
    await getExpenses();
    setExpenseData({
      title: "",
      amount: 0,
      currency: group.currency,
      description: "",
      date: new Date(),
      tags: [],
    });
    setIsOpen(false);
  };

  const onChangeGroupData = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setExpenseData({
      ...expenseData,
      [e.target.id]: e.target.value,
    });
  };

  const onChangeGroupTag = (tag: string) => {
    if (expenseData.tags.includes(tag)) {
      setExpenseData({
        ...expenseData,
        tags: expenseData.tags.filter((item) => item !== tag),
      });
    } else {
      setExpenseData({
        ...expenseData,
        tags: [...expenseData.tags, tag],
      });
    }
  };
  const onChangeCurrency = (e: string) => {
    setExpenseData({
      ...expenseData,
      currency: e,
    });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Create Expense
                </Dialog.Title>
                <Tab.Group>
                  <Tab.List className="flex flex-wrap mt-4 space-x-1 rounded-xl bg-blue-500/20 p-1">
                    {categories &&
                      categories.map((category) => {
                        return (
                          <Tab
                            key={category}
                            className={({ selected }) =>
                              classNames(
                                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                                "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                                selected
                                  ? "bg-white shadow"
                                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                              )
                            }
                          >
                            {category}
                          </Tab>
                        );
                      })}
                  </Tab.List>
                  <Tab.Panels>
                    <Tab.Panel>
                      <Amount
                        expenseData={expenseData}
                        onChangeGroupData={onChangeGroupData}
                        onChangeCurrency={onChangeCurrency}
                      />
                    </Tab.Panel>
                    <Tab.Panel>
                      <TagList
                        expenseData={expenseData}
                        onChangeGroupTag={onChangeGroupTag}
                      />
                    </Tab.Panel>
                    <Tab.Panel>
                      <WhoPaid whoPaid={whoPaid} setWhoPaid={setWhoPaid} />
                    </Tab.Panel>
                    <Tab.Panel>
                      <PaidFor paidFor={paidFor} setPaidFor={setPaidFor} />
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>

                <div className="mt-4 flex w-full justify-around">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onCreate}
                    disabled={loading}
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </div>
                <span className="text-red-300">{error}</span>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default CreateExpense;
