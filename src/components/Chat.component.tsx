import cameraIcon from '../assets/cam.svg';
import addIcon from '../assets/add.svg';
import moreIcon from '../assets/more.svg';
import { InputComponent, MessagesComponent } from '.';
export function ChatComponent() {
  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>Jane</span>
        <div className='chatIcons'>
          <img src={cameraIcon} alt='camera icon' />
          <img src={addIcon} alt='add icon' />
          <img src={moreIcon} alt='more icon' />
        </div>
      </div>

      <MessagesComponent />
      <InputComponent />
    </div>
  );
}
