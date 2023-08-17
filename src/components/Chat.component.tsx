import cameraIcon from '../assets/cam.svg';
import addIcon from '../assets/add.svg';
import moreIcon from '../assets/more.svg';
import chatsIcon from '../assets/chats.svg';

import { InputComponent, MessagesComponent } from '.';
import { useUIStore } from '../store/UIStore';
export function ChatComponent() {
  const { toggleMenuMobile } = useUIStore();

  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>Jane</span>
        <div className='chatIcons'>
          <img src={cameraIcon} alt='camera icon' />
          <img src={addIcon} alt='add icon' />
          <img src={moreIcon} alt='more icon' />

          <img src={chatsIcon} alt='more icon' className='chats-icon' onClick={toggleMenuMobile} />
        </div>
      </div>

      <MessagesComponent />
      <InputComponent />
    </div>
  );
}
