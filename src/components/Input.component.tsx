import { useContext, useState } from 'react';
import imgIcon from '../assets/add-img.svg';
import attachIcon from '../assets/attach.svg';
import sendIcon from '../assets/send.svg';
import { ChatContext } from '../context/chats';
import { AuthContext } from '../context/auth';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

export function InputComponent() {
  const [textMessage, setTextMessage] = useState('');
  const [imageMessage, setImageMessage] = useState<File | null>(null);

  const { chatId, user } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const handleSend = async () => {
    if (!currentUser) return;

    if (imageMessage) {
      const storageRef = ref(storage, `images/${uuid}.jpg`);
      const uploadTask = uploadBytesResumable(storageRef, imageMessage);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.log(error);
          // Handle unsuccessful uploads
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, 'chats', chatId), {
              messages: arrayUnion({
                id: uuid(),
                text: textMessage,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                image: downloadURL,
              }),
            });
          });
        }
      );

      setTextMessage('');
      setImageMessage(null);
    } else {
      await updateDoc(doc(db, 'chats', chatId), {
        messages: arrayUnion({
          id: uuid(),
          text: textMessage,
          senderId: currentUser?.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [chatId + '.lastMessage']: {
        text: textMessage,
      },
      [chatId + '.date']: serverTimestamp(),
    });

    await updateDoc(doc(db, 'userChats', user.uid), {
      [chatId + '.lastMessage']: {
        text: textMessage,
      },
      [chatId + '.date']: serverTimestamp(),
    });

    setTextMessage('');
    setImageMessage(null);
  };

  return (
    <div className='input'>
      <input
        type='text'
        placeholder='Hola...'
        value={textMessage}
        onChange={(event) => setTextMessage(event.target.value)}
      />

      <div className='send'>
        <img src={attachIcon} alt='add img' />

        <input
          type='file'
          style={{ display: 'none' }}
          id='file'
          onChange={(event) => setImageMessage(event.target.files![0])}
        />

        <label htmlFor='file'>
          <img src={imgIcon} alt='add img' />
        </label>

        <button type='button' onClick={handleSend}>
          <span>Send</span>
          <img src={sendIcon} alt='send icon' />
        </button>
      </div>
    </div>
  );
}
