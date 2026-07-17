import Card from '../ui/Card';

export default function VerificationSummary({ modulesTested, passed, failed, skipped, pending }) {
  const total = passed + failed;
  const successRate = total > 0 ? Math.round((passed / total) * 100) : 0;

  const StatBox = ({ label, value, colorClass }) => (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl border border-gray-100">
      <span className={`text-2xl font-bold mb-1 ${colorClass}`}>{value}</span>
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</span>
    </div>
  );

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Verification Summary</h3>
          <p className="text-sm text-gray-500">Overview of the latest execution</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-black text-indigo-600">{successRate}%</div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Success Rate</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatBox label="Tested" value={modulesTested} colorClass="text-indigo-600" />
        <StatBox label="Passed" value={passed} colorClass="text-green-600" />
        <StatBox label="Failed" value={failed} colorClass="text-red-600" />
        <StatBox label="Skipped" value={skipped} colorClass="text-gray-600" />
        <StatBox label="Pending" value={pending} colorClass="text-yellow-600" />
      </div>
    </Card>
  );
}
