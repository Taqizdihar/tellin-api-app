import Card from '../ui/Card';
import Badge from '../ui/Badge';

export default function ApplicationInfoCard({ info }) {
  return (
    <Card className="p-5">
      <h3 className="font-bold text-gray-900 mb-4">Application Information</h3>
      <div className="space-y-3">
        {info.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
            <span className="text-sm text-gray-600">{item.label}</span>
            {item.badge ? (
              <Badge variant="primary">{item.value}</Badge>
            ) : (
              <span className="text-sm font-medium text-gray-900 text-right max-w-[200px] truncate" title={item.value}>{item.value}</span>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
