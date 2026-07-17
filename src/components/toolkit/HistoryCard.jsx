import { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { MethodBadge } from '../explorer/EndpointList';
import { getHistory, deleteHistoryRecord, clearHistory } from '../../utils/historyStorage';
import { useToast } from '../../context/ToastContext';
import { Trash2, Inbox } from 'lucide-react';
import EmptyState from '../common/EmptyState';

export default function HistoryCard() {
  const [history, setHistory] = useState([]);
  const { showToast } = useToast();

  const loadHistory = () => {
    setHistory(getHistory());
  };

  useEffect(() => {
    loadHistory();
    // In a real app we might use context or events to keep this in sync
    // if other components modify it. Since they don't simultaneously, this is fine.
  }, []);

  const handleDelete = (id) => {
    deleteHistoryRecord(id);
    loadHistory();
    showToast('Record deleted', 'success');
  };

  const handleClear = () => {
    clearHistory();
    loadHistory();
    showToast('History cleared', 'success');
  };

  return (
    <Card className="p-5 flex flex-col h-full max-h-[600px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Request History</h3>
        {history.length > 0 && (
          <Button variant="ghost" onClick={handleClear} className="text-xs py-1 px-2 text-red-600 hover:text-red-700 hover:bg-red-50">
            Clear All
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {history.length === 0 ? (
          <div className="flex-1 flex flex-col justify-center">
            <EmptyState 
              icon={Inbox}
              title="No request history yet"
              description="Execute an API request to populate this list."
            />
          </div>
        ) : (
          history.map(record => (
            <div key={record.id} className="p-3 border border-gray-100 rounded-lg hover:border-gray-200 hover:bg-gray-50 flex items-center gap-3 group">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <MethodBadge method={record.method} />
                  <span className="text-sm font-medium text-gray-900 truncate">{record.endpoint}</span>
                  <Badge variant={record.success ? 'success' : 'danger'} className="ml-auto text-[10px]">
                    {record.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{new Date(record.timestamp).toLocaleTimeString()}</span>
                  <span>&bull;</span>
                  <span>{record.module}</span>
                  <span>&bull;</span>
                  <span>{record.duration}ms</span>
                </div>
              </div>
              <button onClick={() => handleDelete(record.id)} className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
