import imgIcon from '../assets/add-img.svg';
import attachIcon from '../assets/attach.svg';
import sendIcon from '../assets/send.svg';

export function InputComponent() {
  return (
    <div className='input'>
      <input type='text' placeholder='Hola...' />

      <div className='send'>
        <img src={attachIcon} alt='add img' />

        <input type='file' style={{ display: 'none' }} id='file' />

        <label htmlFor='file'>
          <img src={imgIcon} alt='add img' />
        </label>

        <button type='button'>
          <span>Send</span>
          <img src={sendIcon} alt='send icon' />
        </button>
      </div>
    </div>
  );
}
