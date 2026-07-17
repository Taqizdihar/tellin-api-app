import Card from '../ui/Card';
import Input from '../ui/Input';

export default function NetworkCard({ networkStats, timeout, delay, onTimeoutChange, onDelayChange }) {
  return (
    <Card className="p-5">
      <h3 className="font-bold text-gray-900 mb-4">Network Settings</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {networkStats.map((stat, idx) => (
          <div key={idx} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
            <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
            <div className="font-medium text-sm text-gray-900">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Request Timeout (ms)</label>
          <Input 
            type="number" 
            value={timeout} 
            onChange={(e) => onTimeoutChange(Number(e.target.value))}
            min={1000}
            step={1000}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Default Request Delay (ms)</label>
          <Input 
            type="number" 
            value={delay} 
            onChange={(e) => onDelayChange(Number(e.target.value))}
            min={0}
            step={500}
          />
        </div>
      </div>
    </Card>
  );
}
