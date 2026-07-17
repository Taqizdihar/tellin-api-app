import VerificationBadge from './VerificationBadge';
import { apiModules } from '../../config/apiModules';

export default function PermissionTable({ results, activeRole }) {
  // Determine expected access based on active role
  const getExpectedAccess = (moduleId, roleId) => {
    if (!roleId) return 'Unknown';
    if (roleId === 'super-admin') return 'Full Access';
    if (roleId === 'admin') {
      if (['system', 'roles', 'permissions'].includes(moduleId)) return 'Denied';
      return 'Full Access';
    }
    if (roleId === 'editor') {
      if (['articles', 'categories', 'knowledge-base'].includes(moduleId)) return 'Full Access';
      return 'Denied';
    }
    return 'Unknown';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 font-semibold">Module</th>
            <th className="px-6 py-4 font-semibold">Expected Access</th>
            <th className="px-6 py-4 font-semibold">Current Result</th>
            <th className="px-6 py-4 font-semibold">Match Result</th>
            <th className="px-6 py-4 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {apiModules.map(module => {
            const result = results[module.id] || {};
            const expected = getExpectedAccess(module.id, activeRole?.id);
            const status = result.status || 'Not Tested';
            
            return (
              <tr key={module.id} className="bg-white hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-gray-100">
                      <module.icon className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{module.title}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600 font-medium">{expected}</td>
                <td className="px-6 py-4 font-mono text-xs">
                  {result.actualStatus ? `${result.actualStatus} ${result.statusText}` : '-'}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {result.match === true ? (
                     <span className="text-green-600 font-medium">Match</span>
                  ) : result.match === false ? (
                     <span className="text-red-600 font-medium">Mismatch</span>
                  ) : '-'}
                </td>
                <td className="px-6 py-4">
                  <VerificationBadge status={status} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
