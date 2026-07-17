import { useState } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { MethodBadge } from './EndpointList';
import HeaderEditor from './HeaderEditor';
import QueryEditor from './QueryEditor';
import BodyEditor from './BodyEditor';
import ExecuteButton from './ExecuteButton';
import ResponseViewer from './ResponseViewer';
import EmptyResponse from './EmptyResponse';
import { executeRequest } from '../../services/explorer/explorerService';
import { createApiError } from '../../utils/apiError';
import { addHistoryRecord } from '../../utils/historyStorage';
import { Lock, Unlock, FileJson, Clock } from 'lucide-react';

export default function RequestBuilder({ endpoint }) {
  const [headers, setHeaders] = useState([]);
  const [queryParams, setQueryParams] = useState([]);
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [requestMeta, setRequestMeta] = useState(null);

  const handleExecute = async () => {
    setLoading(true);
    setResponse(null);
    setError(null);

    // Build params object from key-value pairs
    const params = {};
    queryParams.forEach(p => {
      if (p.key.trim()) params[p.key.trim()] = p.value;
    });

    // Build custom headers object
    const customHeaders = {};
    headers.forEach(h => {
      if (h.key.trim()) customHeaders[h.key.trim()] = h.value;
    });

    // Parse body JSON
    let parsedBody = null;
    if (['POST', 'PUT', 'PATCH'].includes(endpoint.method) && body.trim()) {
      try {
        parsedBody = JSON.parse(body);
      } catch {
        setError({ status: 0, message: 'Invalid JSON in request body.', details: null });
        setLoading(false);
        return;
      }
    }

    const timestamp = new Date().toISOString();
    setRequestMeta({
      method: endpoint.method,
      path: endpoint.path,
      authRequired: endpoint.authRequired,
      timestamp,
    });

    try {
      const result = await executeRequest({
        method: endpoint.method,
        path: endpoint.path,
        body: parsedBody,
        params,
        headers: customHeaders,
      });
      setResponse(result);
      
      addHistoryRecord({
        method: endpoint.method,
        module: endpoint.module,
        endpoint: endpoint.title,
        status: result.status,
        duration: result.duration,
        success: true
      });
    } catch (err) {
      const apiErr = createApiError(err);
      setError(apiErr);
      
      addHistoryRecord({
        method: endpoint.method,
        module: endpoint.module,
        endpoint: endpoint.title,
        status: apiErr.status,
        duration: 0,
        success: false
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Endpoint Header */}
      <Card className="p-4 border border-gray-200">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <MethodBadge method={endpoint.method} />
          <code className="text-sm font-mono text-gray-700 flex-1">{endpoint.path}</code>
          {endpoint.authRequired ? (
            <span className="flex items-center gap-1 text-xs text-amber-600">
              <Lock className="w-3.5 h-3.5" /> Auth Required
            </span>
          ) : (
            <span className="flex items-center gap-1 text-xs text-green-600">
              <Unlock className="w-3.5 h-3.5" /> No Auth
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500">{endpoint.description}</p>
        {endpoint.developerNotes && (
          <div className="mt-2 flex items-start gap-1.5">
            <FileJson className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
            <p className="text-xs text-gray-400 italic">{endpoint.developerNotes}</p>
          </div>
        )}
      </Card>

      {/* Request Configuration */}
      <Card className="p-4 border border-gray-200 space-y-4">
        <HeaderEditor headers={headers} onChange={setHeaders} />
        <hr className="border-gray-100" />
        <QueryEditor params={queryParams} onChange={setQueryParams} />
        <hr className="border-gray-100" />
        <BodyEditor body={body} onChange={setBody} method={endpoint.method} />
      </Card>

      {/* Execute */}
      <div className="flex items-center gap-3">
        <ExecuteButton onClick={handleExecute} loading={loading} />
      </div>

      {/* Request Summary */}
      {requestMeta && (
        <Card className="p-3 border border-gray-200 bg-gray-50">
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
            <span className="flex items-center gap-1">
              <MethodBadge method={requestMeta.method} />
              <code className="font-mono text-gray-700">{requestMeta.path}</code>
            </span>
            <span className="flex items-center gap-1 text-gray-400">
              <Lock className="w-3 h-3" />
              {requestMeta.authRequired ? 'Authenticated' : 'Public'}
            </span>
            <span className="flex items-center gap-1 text-gray-400">
              <Clock className="w-3 h-3" />
              {new Date(requestMeta.timestamp).toLocaleTimeString()}
            </span>
          </div>
        </Card>
      )}

      {/* Response */}
      {(response || error) ? (
        <ResponseViewer response={response} error={error} />
      ) : (
        <EmptyResponse />
      )}
    </div>
  );
}
