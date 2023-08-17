import { useState, KeyboardEvent, useContext } from 'react';

import { DocumentData, collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../firebase';
import { FirebaseError } from 'firebase/app';
import { AuthContext } from '../context/AuthContext';

export function SearchComponent() {
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState<DocumentData | null>(null);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(collection(db, 'users'), where('name', '==', userName));

    try {
      console.log({ q });
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        setUser(doc.data());
      });
    } catch (error) {
      const { code } = error as FirebaseError;
      console.log({ code });
    }
  };

  const handleKey = (event: KeyboardEvent<HTMLInputElement>) => {
    event.code === 'Enter' && handleSearch();
  };

  const handleSelect = async () => {
    // check exists relation chat
    if (!user || !currentUser) return;
    const combinedID = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    const q = query(collection(db, 'chats'), where('uid', '==', combinedID));
    try {
      const res = await getDocs(q);
      if (res.empty) {
        // create chat
        await setDoc(doc(db, 'chats', combinedID), { messages: [] });

        // userChats
      }
    } catch (error) {
      const { code } = error as FirebaseError;
      console.log({ code });
    }
    // create chat
  };

  return (
    <div className='search'>
      <div className='searchForm'>
        <input
          type='text'
          placeholder='Jane...'
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          onKeyDown={handleKey}
        />

        {user && userName.length > 0 ? (
          <div className='userChat' onClick={handleSelect}>
            <img src={user.photoURL} alt='' />

            <div className='userChatInfo'>
              <span>{user.name}</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
