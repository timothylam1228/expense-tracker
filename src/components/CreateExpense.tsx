import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useState } from "react";
import { Tab } from "@headlessui/react";
import Amount from "./expense/Amount";
import WhoPaid from "./expense/WhoPaid";
import PaidFor from "./expense/PaidFor";
import { useExpense } from "../providers/ExpenseProvider";
import { GroupType } from "../providers/GroupProvider";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const CreateExpense = (props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  group: GroupType;
}) => {
  const { isOpen, setIsOpen, group } = props;
  const [error, setError] = useState<string>("");
  const [whoPaid, setWhoPaid] = useState<string>("");
  const [paidFor, setPaidFor] = useState<Array<string>>([]);
  const { createExpense, loading, getExpenses, setLoading } = useExpense();

  const [expenseData, setExpenseData] = useState({
    title: "",
    amount: 0,
    currency: group.currency,
    description: "",
    date: new Date(),
  });

  const categories = ["Amount", "Who Paid", "For Who"];

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
                  <Tab.List className="flex mt-4 space-x-1 rounded-xl bg-blue-500/20 p-1">
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
                  <span className="text-red-300">{error}</span>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default CreateExpense;
