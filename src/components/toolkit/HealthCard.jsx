import { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { executeRequest } from '../../services/explorer/explorerService';
import { useToast } from '../../context/ToastContext';
import apiConfig from '../../config/api';
import { Activity } from 'lucide-react';

export default function HealthCard() {
  const [loading, setLoading] = useState(false);
  const [health, setHealth] = useState({ status: 'Unknown', latency: 0, lastCheck: null });
  const { showToast } = useToast();

  const checkHealth = async () => {
    setLoading(true);
    try {
      const result = await executeRequest({ method: 'GET', path: '/system/health' });
      setHealth({
        status: result.status === 200 ? 'Healthy' : 'Degraded',
        latency: result.duration,
        lastCheck: new Date(),
      });
      showToast('Health check completed', 'success');
    } catch (err) {
      setHealth({
        status: 'Unreachable',
        latency: 0,
        lastCheck: new Date(),
      });
      showToast('Health check failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-indigo-700">
          <Activity className="w-5 h-5" />
          <h3 className="font-semibold text-gray-900">API Health</h3>
        </div>
        <Button onClick={checkHealth} loading={loading} variant="ghost" className="text-xs py-1 px-2">
          Refresh
        </Button>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
          <span className="text-gray-500">Status</span>
          <Badge variant={health.status === 'Healthy' ? 'success' : health.status === 'Degraded' ? 'warning' : 'danger'}>
            {health.status}
          </Badge>
        </div>
        <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
          <span className="text-gray-500">Latency</span>
          <span className="font-medium text-gray-900">{health.latency ? `${health.latency}ms` : '—'}</span>
        </div>
        <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
          <span className="text-gray-500">Last Connection</span>
          <span className="font-medium text-gray-900">{health.lastCheck ? health.lastCheck.toLocaleTimeString() : '—'}</span>
        </div>
        <div className="flex justify-between items-center text-sm pb-1">
          <span className="text-gray-500">Target</span>
          <code className="text-xs bg-gray-100 px-1 rounded text-gray-600 truncate max-w-[150px]">
            {apiConfig.baseURL}
          </code>
        </div>
      </div>
    </Card>
  );
}
