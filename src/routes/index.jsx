import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import Home from '../pages/Home';
import Authentication from '../pages/Authentication';
import ApiExplorer from '../pages/ApiExplorer';
import ResponseInspector from '../pages/ResponseInspector';
import RequestHistory from '../pages/RequestHistory';
import Settings from '../pages/Settings';
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../components/common/ProtectedRoute';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/auth', element: <Authentication /> },
      {
        path: '/explorer',
        element: (
          <ProtectedRoute>
            <ApiExplorer />
          </ProtectedRoute>
        ),
      },
      {
        path: '/inspector',
        element: (
          <ProtectedRoute>
            <ResponseInspector />
          </ProtectedRoute>
        ),
      },
      {
        path: '/history',
        element: (
          <ProtectedRoute>
            <RequestHistory />
          </ProtectedRoute>
        ),
      },
      {
        path: '/settings',
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
