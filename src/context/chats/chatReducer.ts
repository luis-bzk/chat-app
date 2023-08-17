import { ChatState } from '.';
import { UserInfo } from '../../interfaces/user.interface';

type ChatActionType = { type: 'CHANGE_USER'; payload: { user: UserInfo; chatID: string } };

export const chatReducer = (state: ChatState, action: ChatActionType): ChatState => {
  switch (action.type) {
    case 'CHANGE_USER':
      return { ...state, user: action.payload.user, chatId: action.payload.chatID };

    default:
      return state;
  }
};
