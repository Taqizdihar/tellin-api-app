import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import Button from '../ui/Button';

export default function HeaderEditor({ headers, onChange }) {
  const addHeader = () => {
    onChange([...headers, { key: '', value: '' }]);
  };

  const updateHeader = (index, field, value) => {
    const updated = headers.map((h, i) => i === index ? { ...h, [field]: value } : h);
    onChange(updated);
  };

  const removeHeader = (index) => {
    onChange(headers.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Headers</label>
        <button
          type="button"
          onClick={addHeader}
          className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
        >
          <Plus className="w-3 h-3" /> Add
        </button>
      </div>

      {/* Auto-included headers */}
      <div className="space-y-1">
        <div className="flex gap-2 items-center text-xs">
          <span className="w-1/3 bg-gray-50 border border-gray-200 rounded px-2 py-1.5 text-gray-500 font-mono">Content-Type</span>
          <span className="flex-1 bg-gray-50 border border-gray-200 rounded px-2 py-1.5 text-gray-500 font-mono">application/json</span>
          <span className="w-6 text-gray-300 text-center">auto</span>
        </div>
        <div className="flex gap-2 items-center text-xs">
          <span className="w-1/3 bg-gray-50 border border-gray-200 rounded px-2 py-1.5 text-gray-500 font-mono">Authorization</span>
          <span className="flex-1 bg-gray-50 border border-gray-200 rounded px-2 py-1.5 text-gray-500 font-mono truncate">Bearer ••••••••</span>
          <span className="w-6 text-gray-300 text-center">auto</span>
        </div>
      </div>

      {/* Custom headers */}
      {headers.map((h, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input
            className="w-1/3 text-xs border border-gray-300 rounded px-2 py-1.5 font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Header name"
            value={h.key}
            onChange={e => updateHeader(i, 'key', e.target.value)}
          />
          <input
            className="flex-1 text-xs border border-gray-300 rounded px-2 py-1.5 font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Value"
            value={h.value}
            onChange={e => updateHeader(i, 'value', e.target.value)}
          />
          <button onClick={() => removeHeader(i)} className="text-gray-400 hover:text-red-500 p-1">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
