import { Link } from 'react-router-dom';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <FileQuestion className="w-16 h-16 text-gray-300 mb-6" strokeWidth={1.5} />

      <h1 className="text-5xl font-bold text-gray-900 mb-2">404</h1>

      <p className="text-gray-500 mb-6">
        The page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
