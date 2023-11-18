import { Dialog, Listbox, Tab, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { useGroup } from "../providers/GroupProvider"
import { currency } from "../utils/currency"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

const CreateGroup = (props: {
  isOpen: boolean
  setIsOpen: (e: boolean) => void
}) => {
  const { isOpen, setIsOpen } = props
  const [groupData, setGroupData] = useState("")
  const [groupCode, setGroupCode] = useState("")
  const [selectedCurrecy, setSelectedCurrency] = useState("USD")
  const { createGroup, joinGroup } = useGroup()

  function closeModal() {
    setIsOpen(false)
  }

  const onChangeGroupData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupData(e.target.value)
  }
  const onChangeGroupCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupCode(e.target.value)
  }

  const onCreate = async () => {
    await createGroup({ title: groupData, currency: selectedCurrecy })
    setIsOpen(false)
  }
  const onJoin = async () => {
    console.log("join group", groupCode)
    try {
      await joinGroup(groupCode)
    } catch (err) {
      console.log(err)
    }
    setIsOpen(false)
  }
  const create_group = (
    <div className="mt-2 flex flex-col">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          Group name
        </label>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Play Group 1"
          required
          value={groupData}
          onChange={(e) => onChangeGroupData(e)}
        ></input>
      </div>
      <div className="mt-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          Default Currency
        </label>
        <Listbox value={selectedCurrecy} onChange={setSelectedCurrency}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{selectedCurrecy}</span>
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
              <Listbox.Options className="absolute overflow-hidden mt-1 max-h-60 w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                {currency.map((item) => (
                  <Listbox.Option
                    key={item}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
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
      <div className="mt-4 flex w-full justify-around">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={onCreate}
        >
          Create
        </button>
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </div>
  )

  const join_group = (
    <div className="mt-6">
      <input
        type="text"
        id="group_code"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder="Group Code"
        required
        value={groupCode}
        onChange={(e) => onChangeGroupCode(e)}
      ></input>
      <div className="mt-4 flex w-full justify-around">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={onJoin}
        >
          Join
        </button>
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </div>
  )
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10 " onClose={closeModal}>
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
              <Dialog.Panel className="w-full overflow-hidden max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Tab.Group>
                  <Tab.List className="flex mt-4 space-x-1 rounded-xl bg-blue-500/20 p-1">
                    {["Create", "Join"].map((category) => {
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
                      )
                    })}
                  </Tab.List>
                  <Tab.Panels>
                    <Tab.Panel>{create_group}</Tab.Panel>
                    <Tab.Panel>{join_group}</Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
export default CreateGroup
