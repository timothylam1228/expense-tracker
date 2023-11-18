type CreateExpenseButtonProps = {
  setIsOpen: (callback: (pre: boolean) => boolean) => void
}

const CreateExpenseButton = (props: CreateExpenseButtonProps) => {
  const { setIsOpen } = props

  return (
    <div
      onClick={() => setIsOpen((pre: boolean) => !pre)}
      className="w-fit bg-white cursor-pointer rounded-full border-2 border-black px-6 py-6 items-center justify-center flex text-center"
    >
      <div className="w-2 h-2 flex items-center font-extrabold">+</div>
    </div>
  )
}
export default CreateExpenseButton
