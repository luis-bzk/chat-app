import { User } from 'firebase/auth';
import { createContext } from 'react';

interface ContextProps {
  currentUser: User | null;
}
export const AuthContext = createContext({} as ContextProps);
