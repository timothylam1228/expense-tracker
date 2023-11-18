type CreateGroupButtonProps = {
  setIsOpen: (callback: (pre: boolean) => boolean) => void
}
const CreateGroupButton = (props: CreateGroupButtonProps) => {
  const { setIsOpen } = props
  return (
    <div
      onClick={() => setIsOpen((pre: unknown) => !pre)}
      className="w-fit cursor-pointer rounded-full border-2 border-black px-4 py-4 items-center justify-center flex text-center"
    >
      <div className="w-2 h-2 flex items-center font-extrabold">+</div>
    </div>
  )
}
export default CreateGroupButton
