import Card from '../ui/Card';
import { CheckCircle, AlertTriangle, XCircle, Clock } from 'lucide-react';
import Badge from '../ui/Badge';

export default function DiagnosticCard({ title, items }) {
  return (
    <Card className="p-5">
      <h3 className="font-bold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
            <span className="text-sm font-medium text-gray-700">{item.label}</span>
            <div className="flex items-center gap-2">
              {item.status === 'Healthy' && <CheckCircle className="w-4 h-4 text-green-500" />}
              {item.status === 'Warning' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
              {item.status === 'Error' && <XCircle className="w-4 h-4 text-red-500" />}
              {item.status === 'Pending' && <Clock className="w-4 h-4 text-gray-400" />}
              <span className={`text-xs font-bold ${
                item.status === 'Healthy' ? 'text-green-700' :
                item.status === 'Warning' ? 'text-yellow-700' :
                item.status === 'Error' ? 'text-red-700' : 'text-gray-500'
              }`}>{item.status}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
