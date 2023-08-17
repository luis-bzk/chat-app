import { useContext, useEffect, useRef } from 'react';
import { IMessage } from '../interfaces/user.interface';
import { AuthContext } from '../context/auth';
import { ChatContext } from '../context/chats';
import { parseDate } from '../utils/parseDate';

interface Props {
  message: IMessage;
}
export function MessageComponent({ message }: Props) {
  const { currentUser } = useContext(AuthContext);
  const { user } = useContext(ChatContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <div ref={ref} className={`message ${currentUser?.uid === message.senderId ? 'owner' : ''}`}>
      <div className='messageInfo'>
        <img src={currentUser?.uid === message.senderId ? currentUser!.photoURL! : user.photoURL} alt='' />
      </div>
      <div className='messageContent'>
        <p>{message.text}</p>
        {message.image ? <img src={message.image} alt='' /> : null}
        <span>{parseDate(message.date)}</span>
      </div>
    </div>
  );
}
