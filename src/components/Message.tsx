import { useMessage } from "../providers/MessageProvider";
import { MessageType } from "../utils/enum";

const Message = () => {
  const { message, type } = useMessage();

  if (type === MessageType.ERROR)
    return (
      <div className="z-10 fixed bottom-12 items-center justify-center flex w-full">
        <div className="flex items-center flex-row justify-between bg-red-200 first-line:bg-red-200 rounded-md py-3 px-2 w-11/12">
          <div className="font-bold">{message}</div>
          <div className="justify-center flex rounded-full w-8 h-8 items-center">
            x
          </div>
        </div>
      </div>
    );
  if (type === MessageType.SUCCESS)
    return (
      <div className="z-10 fixed bottom-12 items-center justify-center flex w-full">
        <div className="flex flex-row items-center justify-between bg-green-200 first-line:bg-green-200 rounded-md py-3 px-2 w-11/12">
          <div className="font-bold">{message}</div>
          <div className="justify-center flex rounded-full w-8 h-8 items-center">
            x
          </div>
        </div>
      </div>
    );

  if (type === MessageType.WARNING)
    return (
      <div className="z-10 fixed bottom-12 items-center justify-center flex w-full">
        <div className="flex flex-row justify-between bg-blue-200 first-line:bg-blue-200 rounded-md py-3 px-2 w-11/12">
          <div className="font-bold">{message}</div>
          <div className="justify-center flex rounded-full w-8 h-8 items-center">
            x
          </div>
        </div>
      </div>
    );
};
export default Message;
