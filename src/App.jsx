import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { ToastProvider } from './context/ToastContext';
import { PreferenceProvider } from './context/PreferenceContext';

export default function App() {
  return (
    <PreferenceProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </PreferenceProvider>
  );
}
