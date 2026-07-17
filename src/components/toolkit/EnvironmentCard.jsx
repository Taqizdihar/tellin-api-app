import Card from '../ui/Card';
import apiConfig from '../../config/api';
import { DEV_MODE } from '../../config/constants';
import { REQUEST } from '../../config/constants';
import { Server } from 'lucide-react';

export default function EnvironmentCard() {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-4 text-indigo-700">
        <Server className="w-5 h-5" />
        <h3 className="font-semibold text-gray-900">Environment Viewer</h3>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
          <span className="text-gray-500">API Base URL</span>
          <code className="bg-gray-100 px-2 py-1 rounded text-gray-700 text-xs truncate max-w-[200px]">
            {apiConfig.baseURL}
          </code>
        </div>
        <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
          <span className="text-gray-500">Frontend Environment</span>
          <span className="font-medium text-gray-900">Vite React</span>
        </div>
        <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
          <span className="text-gray-500">Developer Mode</span>
          <span className="font-medium text-gray-900">{DEV_MODE ? 'Enabled' : 'Disabled'}</span>
        </div>
        <div className="flex justify-between items-center text-sm pb-1">
          <span className="text-gray-500">Request Timeout</span>
          <span className="font-medium text-gray-900">{REQUEST.TIMEOUT}ms</span>
        </div>
      </div>
    </Card>
  );
}
