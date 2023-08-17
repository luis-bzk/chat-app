import { FormEvent, useState } from 'react';

import { auth, db, storage } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import '../styles.scss';
import addImage from '../assets/add-image.svg';
import logoImage from '../assets/icon-message.png';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';

export function RegisterPage() {
  const [loadingForm, setLoadingForm] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setLoadingForm(true);

    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const file = formData.get('file') as File;
    event.currentTarget.reset();

    try {
      if (!name) {
        return alert('Necesitas introducir tu nombre');
      }
      if (!email) {
        return alert('Necesitas introducir tu correo');
      }
      if (!password) {
        return alert('Necesitas introducir tu contraseña');
      }
      if (!file.name) {
        return alert('Necesitas seleccionar tu avatar');
      }

      const resFirebase = await createUserWithEmailAndPassword(auth, email.toString(), password.toString());

      const storageRef = ref(storage, `images/${resFirebase.user.uid}.jpg`);
      const uploadTask = uploadBytesResumable(storageRef, file);

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
            await updateProfile(resFirebase.user, {
              displayName: name.toString(),
              photoURL: downloadURL,
            });
            await setDoc(doc(db, 'users', resFirebase.user.uid), {
              uid: resFirebase.user.uid,
              name: name,
              email: email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, 'userChats', resFirebase.user.uid), {});
            navigate('/');
          });
        }
      );
    } catch (error) {
      const { code } = error as FirebaseError;
      console.log(code);

      switch (code) {
        case 'auth/email-already-in-use':
          return alert('Este usuario ya se encuentra registrado');

        case 'auth/weak-password':
          return alert('La contraseña es muy débil');

        default:
          return alert(code);
      }
    } finally {
      setLoadingForm(false);
    }
  };

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <div className='header'>
          <img src={logoImage} alt='image icon' className='image-logo' />
          <span className='logo'>Chat App</span>
          <span className='title'>Register</span>
        </div>

        <form onSubmit={(event) => handleSubmit(event)}>
          <input name='name' type='text' placeholder='Nombre' />
          <input name='email' type='email' placeholder='Email' />
          <input name='password' type='password' placeholder='Contraseña' />

          <input name='file' type='file' accept='.jpg, .jpeg, .png, .svg, .webp' id='file' className='inputFile' />
          <label htmlFor='file' className='imageUpload'>
            <img src={addImage} alt='add image' className='image' />
            <span>Agregar avatar</span>
          </label>

          <button className={`submit-button ${loadingForm ? 'loading' : ''}`} type='submit'>
            Registrarme
          </button>
        </form>

        <p>
          Ya tienes una cuenta? <Link to={'/login'}>Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}
