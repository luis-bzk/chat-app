import '../styles/styles.scss';
import addImage from '../assets/add-image.svg';
import logoImage from '../assets/icon-message.png';

export function RegisterPage() {
  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <div className='header'>
          <img src={logoImage} alt='image icon' className='image-logo' />
          <span className='logo'>Chat App</span>
          <span className='title'>Register</span>
        </div>

        <form>
          <input type='text' placeholder='Nombre' />
          <input type='email' placeholder='Email' />
          <input type='password' placeholder='Contraseña' />

          <input type='file' id='file' className='inputFile' />
          <label htmlFor='file' className='imageUpload'>
            <img src={addImage} alt='add image' className='image' />
            <span>Agregar avatar</span>
          </label>

          <button className='' type='submit'>
            Registrarme
          </button>
        </form>

        <p>Ya tienes una cuenta? Inicia sesión</p>
      </div>
    </div>
  );
}
