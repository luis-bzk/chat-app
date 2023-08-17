import { createBrowserRouter, Navigate, Route, RouterProvider, Routes } from 'react-router-dom';

import './styles.scss';
import { RegisterPage } from './pages/Register';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function Root() {
  const { currentUser } = useContext(AuthContext);
  console.log({ currentUser });

  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    if (!currentUser) {
      return <Navigate to={'/login'} />;
    }
    return children;
  };

  return (
    <Routes>
      <Route path='/'>
        <Route
          index
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

const router = createBrowserRouter([{ path: '*', Component: Root }]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
