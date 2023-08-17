import { FormEvent, useState } from 'react';

import { signInWithEmailAndPassword } from 'firebase/auth';

import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../assets/icon-message.png';
import { auth } from '../firebase';
import { FirebaseError } from 'firebase/app';

export function LoginPage() {
  const [loadingForm, setLoadingForm] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setLoadingForm(true);

    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    event.currentTarget.reset();

    if (!email) {
      return alert('Necesitas introducir tu correo');
    }
    if (!password) {
      return alert('Necesitas introducir tu contraseña');
    }

    try {
      await signInWithEmailAndPassword(auth, email.toString(), password.toString());
      navigate('/');
    } catch (error) {
      const { code } = error as FirebaseError;
      console.log(code);

      switch (code) {
        case 'auth/wrong-password':
          return alert('Email o contraseña inválidos');
        case 'auth/user-not-found':
          return alert('Email o contraseña inválidos');
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
          <input name='email' type='email' placeholder='Email' />
          <input name='password' type='password' placeholder='Contraseña' />

          <button className={`submit-button ${loadingForm ? 'loading' : ''}`} type='submit'>
            Iniciar sesión
          </button>
        </form>

        <p>
          No tienes una cuenta? <Link to={'/register'}> Regístrate</Link>
        </p>
      </div>
    </div>
  );
}
