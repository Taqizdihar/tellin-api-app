import { Loader2 } from 'lucide-react';

export default function Loader({ size = 24, className = '' }) {
  return <Loader2 size={size} className={`animate-spin text-indigo-600 ${className}`} />;
}
