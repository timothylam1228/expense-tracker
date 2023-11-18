import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { currency as currencies } from "../../utils/currency";
import { ExpenseType } from "../../providers/ExpenseProvider";

type AmountType = {
  onChangeGroupData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  expenseData: ExpenseType;
  onChangeCurrency: (e: string) => void;
};

const Amount = (props: AmountType) => {
  const { onChangeGroupData, expenseData, onChangeCurrency } = props;
  return (
    <div className="mt-2 flex flex-col">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Title
        </label>
        <input
          type="text"
          id="title"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 "
          placeholder="Dinner"
          required
          value={expenseData.title}
          onChange={(e) => onChangeGroupData(e)}
        ></input>
      </div>
      <div className="mt-4">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 "
          placeholder="123"
          required
          value={expenseData.amount}
          onChange={(e) => onChangeGroupData(e)}
        ></input>
      </div>
      <div className="mt-4">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Date
        </label>
        <input
          type="date"
          id="date"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 "
          placeholder="Dinner"
          required
          value={new Date(expenseData.date).toISOString().split("T")[0]}
          onChange={(e) => onChangeGroupData(e)}
        ></input>
      </div>
      <div className="mt-4">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Currency
        </label>
        <Listbox value={expenseData.currency} onChange={onChangeCurrency}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{expenseData.currency}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute justify-evenly flex mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                {currencies.map((item) => (
                  <Listbox.Option
                    key={item}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 w-full text-center ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </div>
  );
};

export default Amount;
