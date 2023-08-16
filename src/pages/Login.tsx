import '../styles/styles.scss';
import logoImage from '../assets/icon-message.png';

export function LoginPage() {
  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <div className='header'>
          <img src={logoImage} alt='image icon' className='image-logo' />
          <span className='logo'>Chat App</span>
          <span className='title'>Register</span>
        </div>

        <form>
          <input type='email' placeholder='Email' />
          <input type='password' placeholder='Contraseña' />

          <button className='' type='submit'>
            Iniciar sesion
          </button>
        </form>

        <p>No tienes una cuenta? Regístrate</p>
      </div>
    </div>
  );
}
