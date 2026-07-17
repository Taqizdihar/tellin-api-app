import { useState, useEffect } from 'react';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import { roles } from '../config/roles';
import { apiModules } from '../config/apiModules';
import { getEndpointsByModule } from '../config/apiEndpoints';
import { verificationService } from '../services/common/verificationService';
import RoleCard from '../components/role-verification/RoleCard';
import PermissionTable from '../components/role-verification/PermissionTable';
import VerificationSummary from '../components/role-verification/VerificationSummary';
import ExecutionHistory from '../components/role-verification/ExecutionHistory';
import { getHistory, addHistoryRecord, clearHistory } from '../utils/roleHistoryStorage';
import { Download, Play, AlertCircle } from 'lucide-react';

export default function RoleVerification() {
  const { user, isAuthenticated } = useAuth();
  const [activeRole, setActiveRole] = useState(roles[0]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [results, setResults] = useState({});
  const [historyData, setHistoryData] = useState([]);
  const [summaryData, setSummaryData] = useState({ modulesTested: 0, passed: 0, failed: 0, skipped: 0, pending: 0 });

  useEffect(() => {
    setHistoryData(getHistory());
  }, []);

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

  const runVerification = async () => {
    setIsVerifying(true);
    const newResults = {};
    let passed = 0, failed = 0, skipped = 0, pendingCount = 0;

    for (const mod of apiModules) {
      const endpoints = getEndpointsByModule(mod.id);
      const testEp = endpoints.find(e => e.method === 'GET') || endpoints[0];
      
      if (!testEp) {
        newResults[mod.id] = { status: 'Not Tested', actualStatus: null, statusText: 'No endpoints', match: null, executionTime: 0 };
        skipped++;
        continue;
      }

      if (testEp.status === 'Pending' || testEp.status === 'Coming Soon') {
        pendingCount++;
      }

      const res = await verificationService.testEndpoint(testEp.method, testEp.path);
      const expected = getExpectedAccess(mod.id, activeRole.id);
      
      let isMatch = false;
      let finalStatus = 'Unknown';

      if (expected === 'Full Access') {
        isMatch = res.status >= 200 && res.status < 300;
        finalStatus = isMatch ? 'Verified' : 'Denied';
      } else if (expected === 'Denied') {
        isMatch = res.status === 403 || res.status === 401;
        finalStatus = isMatch ? 'Verified' : 'Denied';
      }

      newResults[mod.id] = {
        status: finalStatus,
        actualStatus: res.status,
        statusText: res.statusText,
        executionTime: res.executionTime,
        match: isMatch
      };

      if (isMatch) passed++;
      else failed++;
    }

    setResults(newResults);
    
    const stats = { modulesTested: passed + failed, passed, failed, skipped, pending: pendingCount };
    setSummaryData(stats);
    
    const summary = {
      roleId: activeRole.id,
      roleName: activeRole.name,
      ...stats,
      total: stats.modulesTested,
      successRate: stats.modulesTested > 0 ? Math.round((stats.passed / stats.modulesTested) * 100) : 0,
      results: newResults,
    };
    
    const updatedHistory = addHistoryRecord(summary);
    setHistoryData(updatedHistory);
    setIsVerifying(false);
  };

  const exportToJson = () => {
    const dataStr = JSON.stringify(historyData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'role_verification_export.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleClearHistory = () => {
    setHistoryData(clearHistory());
  };

  const handleSelectHistory = (item) => {
    setResults(item.results);
    setSummaryData({
      modulesTested: item.modulesTested,
      passed: item.passed,
      failed: item.failed,
      skipped: item.skipped,
      pending: item.pending
    });
    const role = roles.find(r => r.id === item.roleId) || roles[0];
    setActiveRole(role);
  };

  return (
    <div className="space-y-6 pb-10">
      <PageHeader 
        title="Role Verification Console" 
        description="Verify Laravel authorization by executing API checks against defined roles."
      />

      {/* SECTION 1: Current Session */}
      <section>
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">1. Current Session</h2>
        <Card className="p-5 flex flex-wrap gap-6 items-center">
          <div>
            <div className="text-xs text-gray-500 mb-1">Current User</div>
            <div className="font-semibold text-gray-900">{user?.name || 'Guest'}</div>
          </div>
          <div className="h-10 border-r border-gray-200"></div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Current Role</div>
            <Badge variant="primary">{user?.role || 'None'}</Badge>
          </div>
          <div className="h-10 border-r border-gray-200"></div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Authentication Status</div>
            <Badge variant={isAuthenticated ? 'success' : 'danger'}>
              {isAuthenticated ? 'Authenticated' : 'Unauthenticated'}
            </Badge>
          </div>
          <div className="h-10 border-r border-gray-200"></div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Session Active</div>
            <div className="font-medium text-gray-800">{isAuthenticated ? 'Yes' : 'No'}</div>
          </div>
          <div className="h-10 border-r border-gray-200"></div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Auth Source</div>
            <div className="font-medium text-gray-800">Auth Context</div>
          </div>
        </Card>
      </section>

      {/* SECTION 2: Role Matrix */}
      <section>
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">2. Role Matrix</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roles.map(role => (
            <RoleCard 
              key={role.id} 
              role={role} 
              isActive={activeRole.id === role.id}
              onSelect={setActiveRole} 
            />
          ))}
        </div>
      </section>

      {/* SECTION 3: Permission Verification */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">3. Permission Verification</h2>
          <div className="flex gap-2">
            <Button variant="primary" onClick={runVerification} disabled={isVerifying}>
              {isVerifying ? (
                <>Verifying...</>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Run Verification
                </>
              )}
            </Button>
          </div>
        </div>

        {Object.keys(results).length > 0 && (
          <div className="mb-4">
            <VerificationSummary {...summaryData} />
          </div>
        )}

        <Card>
          <PermissionTable results={results} activeRole={activeRole} />
        </Card>
      </section>

      {/* SECTION 4: Execution History */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">4. Execution History</h2>
          <Button variant="outline" size="sm" onClick={exportToJson} disabled={historyData.length === 0}>
            <Download className="w-4 h-4 mr-2" />
            Export JSON
          </Button>
        </div>
        <ExecutionHistory 
          historyData={historyData} 
          onSelectHistory={handleSelectHistory} 
          onClear={handleClearHistory} 
        />
      </section>
    </div>
  );
}
