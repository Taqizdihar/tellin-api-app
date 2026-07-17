import { Plus, Trash2 } from 'lucide-react';

export default function QueryEditor({ params, onChange }) {
  const addParam = () => {
    onChange([...params, { key: '', value: '' }]);
  };

  const updateParam = (index, field, value) => {
    const updated = params.map((p, i) => i === index ? { ...p, [field]: value } : p);
    onChange(updated);
  };

  const removeParam = (index) => {
    onChange(params.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Query Parameters</label>
        <button
          type="button"
          onClick={addParam}
          className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
        >
          <Plus className="w-3 h-3" /> Add
        </button>
      </div>

      {params.length === 0 && (
        <p className="text-xs text-gray-400 italic">No query parameters.</p>
      )}

      {params.map((p, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input
            className="w-1/3 text-xs border border-gray-300 rounded px-2 py-1.5 font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Parameter"
            value={p.key}
            onChange={e => updateParam(i, 'key', e.target.value)}
          />
          <input
            className="flex-1 text-xs border border-gray-300 rounded px-2 py-1.5 font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Value"
            value={p.value}
            onChange={e => updateParam(i, 'value', e.target.value)}
          />
          <button onClick={() => removeParam(i)} className="text-gray-400 hover:text-red-500 p-1">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
