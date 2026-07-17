import { useState } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { isSuccessStatus } from '../../utils/apiError';
import { useToast } from '../../context/ToastContext';
import { Clock, HardDrive, CheckCircle, XCircle, Copy, Download, AlignLeft, Maximize2, Minimize2 } from 'lucide-react';

function MetricPill({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-gray-600">
      <Icon className="w-3.5 h-3.5 text-gray-400" />
      <span className="text-gray-400">{label}:</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

export default function ResponseViewer({ response, error }) {
  const [isPretty, setIsPretty] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { showToast } = useToast();

  if (error) {
    return (
      <Card className="p-5 border border-red-200 bg-red-50">
        <div className="flex items-center gap-2 mb-3">
          <XCircle className="w-5 h-5 text-red-500" />
          <h3 className="font-semibold text-red-800">Request Failed</h3>
          {error.status > 0 && (
            <Badge variant="danger">{error.status}</Badge>
          )}
        </div>
        <p className="text-sm text-red-700 mb-3">{error.message}</p>
        {error.details && (
          <pre className="text-xs bg-red-100 rounded-lg p-3 overflow-auto max-h-64 font-mono text-red-800">
            {JSON.stringify(error.details, null, 2)}
          </pre>
        )}
      </Card>
    );
  }

  if (!response) return null;

  const success = isSuccessStatus(response.status);
  const sizeKb = response.size > 1024
    ? `${(response.size / 1024).toFixed(1)} KB`
    : `${response.size} B`;

  const jsonData = isPretty ? JSON.stringify(response.data, null, 2) : JSON.stringify(response.data);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonData);
    showToast('Copied JSON to clipboard', 'success');
  };

  const handleDownload = () => {
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'response.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Download started', 'success');
  };

  return (
    <Card className={`p-5 border ${success ? 'border-green-200' : 'border-red-200'}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          {success ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500" />
          )}
          <Badge variant={success ? 'success' : 'danger'}>
            {response.status} {response.statusText}
          </Badge>
        </div>
        <div className="flex items-center gap-4">
          <MetricPill icon={Clock} label="Time" value={`${response.duration}ms`} />
          <MetricPill icon={HardDrive} label="Size" value={sizeKb} />
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          <span className="text-xs text-gray-400 font-mono">response.json</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setIsPretty(!isPretty)} className="text-gray-400 hover:text-white" title="Toggle Format">
              <AlignLeft className="w-4 h-4" />
            </button>
            <button onClick={handleCopy} className="text-gray-400 hover:text-white" title="Copy">
              <Copy className="w-4 h-4" />
            </button>
            <button onClick={handleDownload} className="text-gray-400 hover:text-white" title="Download">
              <Download className="w-4 h-4" />
            </button>
            <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-gray-400 hover:text-white ml-2" title="Toggle Collapse">
              {isCollapsed ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
        {!isCollapsed && (
          <pre className="text-xs p-4 font-mono text-green-400 whitespace-pre-wrap break-words overflow-auto max-h-96">
            {jsonData}
          </pre>
        )}
      </div>
    </Card>
  );
}
