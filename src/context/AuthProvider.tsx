import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../firebase';
import { User, onAuthStateChanged } from 'firebase/auth';

interface Props {
  children: JSX.Element;
}

export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => {
      unsub();
    };
  }, []);

  const valuesProvider = {
    currentUser,

    // methods
  };

  return <AuthContext.Provider value={valuesProvider}>{children}</AuthContext.Provider>;
};
