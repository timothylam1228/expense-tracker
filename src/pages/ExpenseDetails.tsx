import { Dialog, Transition } from "@headlessui/react";
import { useGroup } from "../providers/GroupProvider";
import { ExpenseType } from "../providers/ExpenseProvider";
import { Fragment } from "react";
import { Chip } from "@material-tailwind/react";

type ExpenseDetailsProps = {
  isOpen: boolean;
  closeModal: () => void;
  selectedExpense: ExpenseType | null;
};
const ExpenseDetails = (props: ExpenseDetailsProps) => {
  const { closeModal, isOpen, selectedExpense } = props;
  const { userMap } = useGroup();
  // const { group } = useGroup();

  if (!selectedExpense) return null;
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
                  className="text-lg font-medium leading-6 text-gray-900 flex "
                >
                  <div>{selectedExpense && selectedExpense.title}</div>
                </Dialog.Title>
                <Dialog.Description>
                  <div className="text-sm text-gray-500">
                    {selectedExpense && selectedExpense.description}
                  </div>
                </Dialog.Description>

                <div className="flex flex-col">
                  <div className="mt-2 flex flex-1 justify-between">
                    <div>Paid By:</div>
                    <div>Amount</div>
                  </div>
                  <div className="flex flex-1 justify-between border-b">
                    <div> {userMap.get(selectedExpense.whoPaid)}</div>
                    <div className="">${selectedExpense.amount}</div>
                  </div>

                  <div className="mt-2 flex-1">
                    {selectedExpense && selectedExpense.forWho && (
                      <div>
                        Paid For:
                        {selectedExpense.forWho.map(
                          (user: string, idx: number) => {
                            return (
                              <div className="flex justify-between">
                                <div key={idx} className="border-b">
                                  {userMap.get(user)}
                                </div>
                                <div>
                                  {selectedExpense.amount /
                                    selectedExpense.forWho.length}
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex gap-2 flex-wrap">
                    {selectedExpense.tags.map((tag: string) => {
                      return <Chip value={tag} key={tag} color="blue" />;
                    })}
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ExpenseDetails;
