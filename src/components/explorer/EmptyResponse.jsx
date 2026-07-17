import { Inbox } from 'lucide-react';

export default function EmptyResponse() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
      <Inbox className="w-12 h-12 text-gray-300 mb-3" />
      <h3 className="text-base font-medium text-gray-600 mb-1">No request executed</h3>
      <p className="text-sm text-gray-400 max-w-xs">
        Select an endpoint and click Execute to see the response here.
      </p>
    </div>
  );
}
