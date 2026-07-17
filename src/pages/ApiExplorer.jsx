import { useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import ContentContainer from '../components/layout/ContentContainer';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { apiModules } from '../config/apiModules';
import { getEndpointsByModule } from '../config/apiEndpoints';
import EndpointList from '../components/explorer/EndpointList';
import RequestBuilder from '../components/explorer/RequestBuilder';
import EmptyState from '../components/common/EmptyState';
import { Search, Server, FileJson, Zap, MousePointerClick, PackageOpen } from 'lucide-react';

function StatusBadge({ status }) {
  const variants = {
    'Ready': 'success',
    'Pending': 'warning',
    'Coming Soon': 'default',
    'Partial': 'warning',
    'Not Implemented': 'danger'
  };
  return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
}

export default function ApiExplorer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedModuleId, setSelectedModuleId] = useState(apiModules[0]?.id);
  const [selectedEndpointId, setSelectedEndpointId] = useState(null);

  const filters = ['All', 'Ready', 'Pending', 'Coming Soon'];

  const filteredModules = apiModules.filter(mod => {
    const matchesSearch = mod.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          mod.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || mod.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const selectedModule = apiModules.find(m => m.id === selectedModuleId);
  const moduleEndpoints = selectedModuleId ? getEndpointsByModule(selectedModuleId) : [];
  const selectedEndpoint = moduleEndpoints.find(ep => ep.id === selectedEndpointId);

  const handleModuleSelect = (id) => {
    setSelectedModuleId(id);
    setSelectedEndpointId(null);
  };

  return (
    <div className="h-full flex flex-col">
      <PageHeader 
        title="API Explorer" 
        description="Browse and inspect backend module services"
      />
      <ContentContainer className="flex-1 flex flex-col md:flex-row gap-6 p-4">
        {/* LEFT PANEL - Module Navigation (30%) */}
        <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col gap-4">
          <Card className="p-4 flex flex-col gap-4 sticky top-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search modules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    activeFilter === f 
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-medium' 
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </Card>
          
          <div className="flex-1 overflow-y-auto space-y-3 pb-4">
            {filteredModules.map((mod) => {
              const Icon = mod.icon;
              const isSelected = selectedModuleId === mod.id;
              const endpointCount = getEndpointsByModule(mod.id).length;
              
              return (
                <div 
                  key={mod.id}
                  onClick={() => handleModuleSelect(mod.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-indigo-50 border-indigo-200 shadow-sm' 
                      : 'bg-white border-gray-200 hover:border-indigo-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-md ${isSelected ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className={`text-sm font-semibold truncate ${isSelected ? 'text-indigo-900' : 'text-gray-900'}`}>
                          {mod.title}
                        </h4>
                        <span className="text-xs text-gray-400 shrink-0">{endpointCount} ep</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">{mod.description}</p>
                      <div className="mt-2">
                        <StatusBadge status={mod.status} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {filteredModules.length === 0 && (
              <div className="text-center py-8 text-gray-500 text-sm">
                No modules found matching your criteria.
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL - Module Details + Request Builder (70%) */}
        <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col">
          {selectedModule ? (
            <div className="space-y-6">
              {/* Module Header */}
              <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
                <div className="p-3 bg-indigo-100 text-indigo-700 rounded-lg">
                  <selectedModule.icon className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedModule.title}</h2>
                    <StatusBadge status={selectedModule.status} />
                  </div>
                  <p className="text-gray-600 mt-1">{selectedModule.description}</p>
                </div>
              </div>

              {/* Module Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-5 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-4 text-indigo-700">
                    <Server className="w-5 h-5" />
                    <h3 className="font-semibold text-gray-900">Architecture</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Service Layer</span>
                      <code className="bg-gray-100 px-2 py-1 rounded text-gray-700">
                        {selectedModule.serviceName}
                      </code>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Service Status</span>
                      <span className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded border border-gray-200">
                        {['Ready', 'Pending'].includes(selectedModule.status) ? 'Implemented' : 'Not Implemented'}
                      </span>
                    </div>
                  </div>
                </Card>

                <Card className="p-5 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-4 text-indigo-700">
                    <Zap className="w-5 h-5" />
                    <h3 className="font-semibold text-gray-900">Endpoints</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Available</span>
                      <span className="font-medium text-gray-900">{moduleEndpoints.length} endpoints</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">API Execution</span>
                      <Badge variant="success">Enabled</Badge>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Developer Notes */}
              <Card className="p-5 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4 text-indigo-700">
                  <FileJson className="w-5 h-5" />
                  <h3 className="font-semibold text-gray-900">Developer Notes</h3>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {selectedModule.developerNotes}
                  </p>
                </div>
              </Card>

              {/* Endpoint List */}
              <Card className="p-5 border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Available Endpoints</h3>
                <EndpointList
                  endpoints={moduleEndpoints}
                  selectedId={selectedEndpointId}
                  onSelect={setSelectedEndpointId}
                />
              </Card>

              {/* Request Builder */}
              {selectedEndpoint ? (
                <RequestBuilder key={selectedEndpoint.id} endpoint={selectedEndpoint} />
              ) : moduleEndpoints.length > 0 ? (
                <EmptyState 
                  icon={MousePointerClick} 
                  title="Select an Endpoint" 
                  description="Choose an endpoint from the list above to configure and execute a request." 
                />
              ) : null}
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center">
              <EmptyState 
                icon={PackageOpen}
                title="No Module Selected"
                description="Select a module from the sidebar to view its details and endpoints."
              />
            </div>
          )}
        </div>
      </ContentContainer>
    </div>
  );
}
