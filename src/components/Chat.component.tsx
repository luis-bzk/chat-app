import cameraIcon from '../assets/cam.svg';
import addIcon from '../assets/add.svg';
import moreIcon from '../assets/more.svg';
import chatsIcon from '../assets/chats.svg';

import { InputComponent, MessagesComponent } from '.';
import { useUIStore } from '../store/UIStore';
import { useContext } from 'react';
import { ChatContext } from '../context/chats';
export function ChatComponent() {
  const { user, chatId } = useContext(ChatContext);

  const { toggleMenuMobile } = useUIStore();

  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>{user.displayName ? user.displayName : 'Chats'}</span>
        <div className='chatIcons'>
          <img src={cameraIcon} alt='camera icon' />
          <img src={addIcon} alt='add icon' />
          <img src={moreIcon} alt='more icon' />

          <img src={chatsIcon} alt='more icon' className='chats-icon' onClick={toggleMenuMobile} />
        </div>
      </div>

      {chatId ? (
        <MessagesComponent />
      ) : (
        <div className='chats-board'>
          <p className='info-chats'>Selecciona un chat</p>
        </div>
      )}
      <InputComponent />
    </div>
  );
}
