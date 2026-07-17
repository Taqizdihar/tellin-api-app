import Card from '../ui/Card';
import { PackageOpen } from 'lucide-react';

export default function EmptyState({ icon: Icon = PackageOpen, title, description, action }) {
  return (
    <Card className="flex flex-col items-center justify-center p-12 text-center min-h-[300px]">
      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-gray-400" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
        {description}
      </p>
      {action && (
        <div>{action}</div>
      )}
    </Card>
  );
}
