import { createContext } from 'react';
import { UserInfo } from '../../interfaces/user.interface';

interface ContextProps {
  chatId: string;
  user: UserInfo;

  // methods
  setUserChat: (user: UserInfo) => void;
}

export const ChatContext = createContext({} as ContextProps);
