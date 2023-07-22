import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AppLayout from './AppLayout';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/login', element: <Login /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
