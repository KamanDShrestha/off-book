import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AppLayout from './AppLayout';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import BookDetails from './pages/BookDetails';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import Users from './pages/Users';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/login', element: <Login /> },
      { path: '/book/:id', element: <BookDetails /> },
      { path: '/wishlist', element: <Wishlist /> },
      { path: '/profile', element: <Profile /> },
      { path: '/users', element: <Users /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position='top-center'
        toastOptions={{
          success: {
            duration: 3000,
            style: {
              background: 'white',
              color: 'green',
            },
            error: {
              duration: 5000,
              style: {
                background: 'white',
                color: 'red',
              },
            },
          },
        }}
      />
    </>
  );
}

export default App;
