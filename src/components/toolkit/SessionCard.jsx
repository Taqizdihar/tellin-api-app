import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { getAccessToken } from '../../utils/tokenStorage';
import { UserCheck } from 'lucide-react';

export default function SessionCard() {
  const { user, isAuthenticated } = useAuth();
  const tokenExists = !!getAccessToken();

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-4 text-indigo-700">
        <UserCheck className="w-5 h-5" />
        <h3 className="font-semibold text-gray-900">Session Information</h3>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
          <span className="text-gray-500">Authentication</span>
          <Badge variant={isAuthenticated ? 'success' : 'warning'}>
            {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
          </Badge>
        </div>
        <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
          <span className="text-gray-500">Current User</span>
          <span className="font-medium text-gray-900">{user?.name || 'None'}</span>
        </div>
        <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
          <span className="text-gray-500">Current Role</span>
          <span className="font-medium text-gray-900">{user?.role || 'None'}</span>
        </div>
        <div className="flex justify-between items-center text-sm pb-1">
          <span className="text-gray-500">Token Exists</span>
          <span className="font-medium text-gray-900">{tokenExists ? 'Yes' : 'No'}</span>
        </div>
      </div>
    </Card>
  );
}
