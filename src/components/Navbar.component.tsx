import { signOut } from 'firebase/auth';
import closeIcon from '../assets/close.svg';
import { useUIStore } from '../store/UIStore';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
export function NavbarComponent() {
  const { currentUser } = useContext(AuthContext);
  const { toggleMenuMobile } = useUIStore();
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth);
    navigate('/login');
  };
  return (
    <div className='navbar'>
      <span className='logo'>Chat App</span>

      <div className='user'>
        <img src={currentUser!.photoURL!} alt='' className='profile-picture' />
        <span>{currentUser?.displayName}</span>

        <button type='button' onClick={logout}>
          Salir
        </button>
      </div>

      <img src={closeIcon} alt='Close icon' className='close-icon' onClick={toggleMenuMobile} />
    </div>
  );
}
