import { MessageType, useMessage } from "../providers/MessageProvider";

const Message = () => {
  const { message, type } = useMessage();

  if (type === MessageType.ERROR)
    return (
      <div className="w-full absolute bottom-2 items-center justify-center flex">
        <div className="flex flex-row justify-between bg-red-200 first-line:bg-red-200 rounded-md py-2 w-full">
          <div>{message}</div>
          <div>X</div>
        </div>
      </div>
    );
  if (type === MessageType.SUCCESS)
    return (
      <div className="fixed bottom-24 items-center justify-center flex w-full">
        <div className="flex flex-row justify-between bg-green-200 first-line:bg-green-200 rounded-md py-4 px-2 w-11/12">
          <div>{message}</div>
          <div>X</div>
        </div>
      </div>
    );

  if (type === MessageType.WARNING)
    return (
      <div className="w-full absolute bottom-2 items-center justify-center flex">
        <div className="flex flex-row justify-between bg-blue-200 first-line:bg-blue-200 rounded-md px-2 py-2 w-full">
          <div>{message}</div>
          <div>X</div>
        </div>
      </div>
    );
};
export default Message;
