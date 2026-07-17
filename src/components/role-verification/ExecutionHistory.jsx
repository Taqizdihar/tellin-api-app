import { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Trash2, Eye, Download } from 'lucide-react';
import Badge from '../ui/Badge';
import EmptyState from '../common/EmptyState';
import { History } from 'lucide-react';

export default function ExecutionHistory({ onSelectHistory, historyData, onClear }) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-gray-900">Execution History</h3>
          <p className="text-sm text-gray-500">Past verification runs</p>
        </div>
        <div className="flex gap-2">
          {historyData.length > 0 && (
            <Button variant="outline" size="sm" onClick={onClear} className="text-red-600 hover:text-red-700">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>
          )}
        </div>
      </div>
      
      {historyData.length === 0 ? (
        <EmptyState 
          icon={History}
          title="No verification history"
          description="Run a verification to see results here."
        />
      ) : (
        <div className="space-y-3">
          {historyData.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary">{item.roleName}</Badge>
                  <span className="text-xs text-gray-500">{new Date(item.timestamp).toLocaleString()}</span>
                </div>
                <div className="text-sm text-gray-700">
                  <span className="font-medium">{item.passed} passed</span> / {item.total} tested ({item.successRate}%)
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => onSelectHistory(item)}>
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
