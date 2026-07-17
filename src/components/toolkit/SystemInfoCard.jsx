import Card from '../ui/Card';
import { APP } from '../../config/constants';
import { Monitor } from 'lucide-react';

export default function SystemInfoCard() {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-4 text-indigo-700">
        <Monitor className="w-5 h-5" />
        <h3 className="font-semibold text-gray-900">System Information</h3>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
          <span className="text-gray-500">Application Name</span>
          <span className="font-medium text-gray-900 truncate max-w-[150px]">{APP.NAME}</span>
        </div>
        <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
          <span className="text-gray-500">Version</span>
          <span className="font-medium text-gray-900">{APP.VERSION}</span>
        </div>
        <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
          <span className="text-gray-500">Frontend Stack</span>
          <span className="font-medium text-gray-900">React + Vite + Tailwind</span>
        </div>
        <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
          <span className="text-gray-500">Backend Type</span>
          <span className="font-medium text-gray-900">Laravel 11+</span>
        </div>
        <div className="flex justify-between items-center text-sm pb-1">
          <span className="text-gray-500">Authentication</span>
          <span className="font-medium text-gray-900">JWT Token</span>
        </div>
      </div>
    </Card>
  );
}
