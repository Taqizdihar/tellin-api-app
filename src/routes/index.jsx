import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';
import PageLoader from '../components/common/PageLoader';

// Lazy loaded pages
const Home = lazy(() => import('../pages/Home'));
const Authentication = lazy(() => import('../pages/Authentication'));
const ApiExplorer = lazy(() => import('../pages/ApiExplorer'));
const ResponseInspector = lazy(() => import('../pages/ResponseInspector'));
const DeveloperToolkit = lazy(() => import('../pages/DeveloperToolkit'));
const RoleVerification = lazy(() => import('../pages/RoleVerification'));
const ApplicationSettings = lazy(() => import('../pages/ApplicationSettings'));
const NotFound = lazy(() => import('../pages/NotFound'));

const withSuspense = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: withSuspense(Home) },
      { path: '/auth', element: withSuspense(Authentication) },
      {
        path: '/explorer',
        element: (
          <ProtectedRoute>
            {withSuspense(ApiExplorer)}
          </ProtectedRoute>
        ),
      },
      {
        path: '/inspector',
        element: (
          <ProtectedRoute>
            {withSuspense(ResponseInspector)}
          </ProtectedRoute>
        ),
      },
      {
        path: '/toolkit',
        element: (
          <ProtectedRoute>
            {withSuspense(DeveloperToolkit)}
          </ProtectedRoute>
        ),
      },
      {
        path: '/settings',
        element: (
          <ProtectedRoute>
            {withSuspense(RoleVerification)}
          </ProtectedRoute>
        ),
      },
      {
        path: '/app-settings',
        element: (
          <ProtectedRoute>
            {withSuspense(ApplicationSettings)}
          </ProtectedRoute>
        ),
      },
      { path: '*', element: withSuspense(NotFound) },
    ],
  },
]);

export default router;
