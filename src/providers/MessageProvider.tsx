import { PropsWithChildren, createContext, useContext, useState } from "react";
import { MessageType } from "../utils/enum";
// Create a Message provider that will be used to display Messages
const MessageContext = createContext<MessageContextType>({
  message: null,
  type: MessageType.SUCCESS,
  handleSetMessage: () => {},
});

type MessageContextType = {
  message: string | null;
  type: MessageType | null;
  handleSetMessage: (arg0: string | null, arg1: MessageType) => void;
};

export const useMessage = () => {
  return useContext(MessageContext);
};

export const MessageProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<MessageType | null>(null);

  const handleSetMessage = (message: string | null, type: MessageType) => {
    setMessage(message);
    setType(type);
    setTimeout(() => {
      setMessage(null);
      setType(null);
    }, 3000);
  };
  const value = {
    message,
    type,
    handleSetMessage,
  };
  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};
