export default function BodyEditor({ body, onChange, method }) {
  const hasBody = ['POST', 'PUT', 'PATCH'].includes(method);

  if (!hasBody) {
    return (
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Request Body</label>
        <p className="text-xs text-gray-400 italic">{method} requests do not have a body.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Request Body (JSON)</label>
      <textarea
        className="w-full h-40 text-xs border border-gray-300 rounded-lg px-3 py-2 font-mono bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white resize-y"
        placeholder={'{\n  "key": "value"\n}'}
        value={body}
        onChange={e => onChange(e.target.value)}
        spellCheck={false}
      />
    </div>
  );
}
