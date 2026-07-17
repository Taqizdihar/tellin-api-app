import Card from '../ui/Card';
import Button from '../ui/Button';

export default function StorageCard({ stats, onRefresh, onClearSelected, onClearAll }) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900">Local Storage</h3>
        <Button variant="outline" size="sm" onClick={onRefresh}>Refresh</Button>
      </div>
      <div className="space-y-4 mb-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex justify-between text-sm">
            <span className="text-gray-600">{stat.label}</span>
            <span className="font-mono text-gray-900">{stat.value}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <Button variant="danger" size="sm" className="flex-1" onClick={onClearSelected}>Clear Selected</Button>
        <Button variant="danger" size="sm" className="flex-1" onClick={onClearAll}>Clear All</Button>
      </div>
    </Card>
  );
}
