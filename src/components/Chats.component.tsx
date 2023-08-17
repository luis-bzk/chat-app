import { useContext, useEffect, useState } from 'react';

import { DocumentData, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/auth';
import { ChatContext } from '../context/chats';
import { UserInfo } from '../interfaces/user.interface';

export function ChatsComponent() {
  const { setUserChat } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const [chats, setChats] = useState<DocumentData[] | undefined>([]);

  useEffect(() => {
    if (!currentUser) return;
    const unsub = onSnapshot(doc(db, 'userChats', currentUser!.uid), (doc) => {
      doc.exists() ? setChats(Object.entries(doc.data()!)) : setChats([]);
    });

    return () => {
      unsub();
    };
  }, [currentUser]);

  const handleSelectChat = (user: UserInfo) => {
    setUserChat(user);
  };

  return (
    <div className='chats'>
      {chats && chats.length > 0
        ? chats
            .sort((a, b) => b[1].date - a[1].date)
            .map((chat) => {
              return (
                <div key={chat[0]} className='userChat' onClick={() => handleSelectChat(chat[1].userInfo)}>
                  <img src={chat[1].userInfo.photoURL} alt='' />

                  <div className='userChatInfo'>
                    <span>{chat[1].userInfo.displayName}</span>
                    <p>{chat[1].lastMessage.text}</p>
                  </div>
                </div>
              );
            })
        : null}
    </div>
  );
}
