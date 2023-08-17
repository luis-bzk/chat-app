import { FC, useContext, useReducer } from 'react';
import { ChatContext, chatReducer } from './';
import { AuthContext } from '../auth';
import { UserInfo } from '../../interfaces/user.interface';

// interface constructor -> state
export interface ChatState {
  chatId: string;
  user: UserInfo;
}

// initial state
const CHAT_INITIAL_STATE: ChatState = {
  chatId: '',
  user: {} as UserInfo,
};

// props provider
interface props {
  children: JSX.Element;
}

// provider
export const ChatProvider: FC<props> = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [state, dispatch] = useReducer(chatReducer, CHAT_INITIAL_STATE);

  const setUserChat = (user: UserInfo) => {
    if (!currentUser) return;
    dispatch({
      type: 'CHANGE_USER',
      payload: {
        user,
        chatID: currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid,
      },
    });
  };

  const valuesProvider = {
    ...state,

    setUserChat,
  };

  return <ChatContext.Provider value={valuesProvider}>{children}</ChatContext.Provider>;
};
