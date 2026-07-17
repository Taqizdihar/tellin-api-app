import Loader from '../ui/Loader';

export default function PageLoader() {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-6">
      <Loader size={32} className="mb-4 text-indigo-500" />
      <p className="text-sm font-medium text-gray-500 animate-pulse">Loading interface...</p>
    </div>
  );
}
