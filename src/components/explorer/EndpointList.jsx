import Badge from '../ui/Badge';

const METHOD_STYLES = {
  GET: 'bg-green-100 text-green-800',
  POST: 'bg-blue-100 text-blue-800',
  PUT: 'bg-yellow-100 text-yellow-800',
  PATCH: 'bg-orange-100 text-orange-800',
  DELETE: 'bg-red-100 text-red-800',
};

export function MethodBadge({ method }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold font-mono ${METHOD_STYLES[method] || 'bg-gray-100 text-gray-800'}`}>
      {method}
    </span>
  );
}

export function EndpointCard({ endpoint, isSelected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`p-3 rounded-lg border cursor-pointer transition-all ${
        isSelected
          ? 'bg-indigo-50 border-indigo-200 shadow-sm'
          : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        <MethodBadge method={endpoint.method} />
        <span className={`text-sm font-semibold truncate ${isSelected ? 'text-indigo-900' : 'text-gray-900'}`}>
          {endpoint.title}
        </span>
      </div>
      <code className="text-xs text-gray-500 font-mono block truncate">{endpoint.path}</code>
      <p className="text-xs text-gray-400 mt-1 line-clamp-1">{endpoint.description}</p>
    </div>
  );
}

export default function EndpointList({ endpoints, selectedId, onSelect }) {
  if (!endpoints.length) {
    return (
      <div className="text-center py-6 text-gray-400 text-sm">
        No endpoints defined for this module.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {endpoints.map(ep => (
        <EndpointCard
          key={ep.id}
          endpoint={ep}
          isSelected={selectedId === ep.id}
          onClick={() => onSelect(ep.id)}
        />
      ))}
    </div>
  );
}
