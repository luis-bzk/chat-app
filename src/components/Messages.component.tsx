import { useContext, useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';

import { MessageComponent } from '.';
import { ChatContext } from '../context/chats';
import { db } from '../firebase';
import { IMessage } from '../interfaces/user.interface';

export function MessagesComponent() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { chatId } = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'chats', chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unsub();
    };
  }, [chatId]);

  return (
    <div className='messages'>
      {messages.length > 0 ? (
        messages.map((message, index) => <MessageComponent message={message} key={index} />)
      ) : (
        <p className='not-messages'>Sin mensajes por el momento</p>
      )}
    </div>
  );
}
