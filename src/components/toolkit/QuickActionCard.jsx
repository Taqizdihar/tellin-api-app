import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { clearHistory } from '../../utils/historyStorage';
import { clearSession } from '../../utils/tokenStorage';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Zap } from 'lucide-react';

export default function QuickActionCard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { showToast } = useToast();

  const handleClearSession = async () => {
    await logout();
    clearSession();
    showToast('Session cleared', 'success');
  };

  const handleClearHistory = () => {
    clearHistory();
    showToast('Request history cleared', 'success');
    window.location.reload(); // Simple way to force refresh of history card in other grid cell
  };

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-4 text-indigo-700">
        <Zap className="w-5 h-5" />
        <h3 className="font-semibold text-gray-900">Quick Actions</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button onClick={handleClearSession} variant="secondary" className="w-full text-xs">
          Clear Session
        </Button>
        <Button onClick={handleClearHistory} variant="secondary" className="w-full text-xs text-red-600 hover:bg-red-50 hover:border-red-200">
          Clear History
        </Button>
        <Button onClick={() => window.location.reload()} variant="secondary" className="w-full text-xs">
          Refresh App
        </Button>
        <Button onClick={() => navigate('/explorer')} variant="primary" className="w-full text-xs">
          API Explorer
        </Button>
      </div>
    </Card>
  );
}
