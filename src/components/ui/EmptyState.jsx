import { Inbox } from 'lucide-react';

export default function EmptyState({ title, description, icon: Icon = Inbox }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-gray-50 rounded-full p-4 mb-4">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-sm font-medium text-gray-900 mb-1">{title}</h3>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  );
}
