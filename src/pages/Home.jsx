import PageHeader from '../components/layout/PageHeader';
import Card from '../components/ui/Card';
import SectionTitle from '../components/ui/SectionTitle';
import Badge from '../components/ui/Badge';
import apiConfig from '../config/api';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, Clock, XCircle, Activity, Layers, Plug, Shield, Database, Workflow, Lock, UserCheck, Send, Eye, Wrench, Settings } from 'lucide-react';

function StatusCard({ icon: Icon, iconBg, iconColor, badge, badgeVariant, title, description }) {
  return (
    <Card className="p-4 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 ${iconBg} rounded-lg`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        <Badge variant={badgeVariant}>{badge}</Badge>
      </div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </Card>
  );
}

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <PageHeader 
        title="Dashboard" 
        description="Tellin API Testing Application Overview"
      />

      <div className="mb-8">
        <Card className="p-6">
          <SectionTitle 
            title="Project Foundation" 
            description="Purpose of this application" 
          />
          <p className="text-gray-600 text-sm mb-4 leading-relaxed max-w-3xl">
            This application is an internal developer tool built to test Laravel APIs and Single Sign-On (SSO) integrations. It provides a lightweight, modern React interface for verifying connectivity, testing endpoints, validating role permissions, and inspecting payloads.
          </p>
          <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100 w-fit">
            <span className="text-sm font-medium text-gray-700">API Base URL:</span>
            <code className="text-xs bg-white border border-gray-200 text-indigo-600 px-2 py-1 rounded font-mono">
              {apiConfig.baseURL}
            </code>
          </div>
        </Card>
      </div>

      <SectionTitle title="System Status" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatusCard icon={CheckCircle} iconBg="bg-green-50" iconColor="text-green-600" badge="Ready" badgeVariant="success" title="Frontend" description="React + Vite Foundation" />
        <StatusCard icon={XCircle} iconBg="bg-red-50" iconColor="text-red-600" badge="Pending Verification" badgeVariant="danger" title="Backend Integration" description="Laravel backend pending" />
        <StatusCard
          icon={isAuthenticated ? CheckCircle : UserCheck}
          iconBg={isAuthenticated ? 'bg-green-50' : 'bg-green-50'}
          iconColor={isAuthenticated ? 'text-green-600' : 'text-green-600'}
          badge={isAuthenticated ? 'Authenticated' : 'Ready'}
          badgeVariant={isAuthenticated ? 'success' : 'success'}
          title="Authentication"
          description={isAuthenticated ? 'Session active' : 'Login module ready'}
        />
        <StatusCard
          icon={isAuthenticated ? CheckCircle : Clock}
          iconBg={isAuthenticated ? 'bg-green-50' : 'bg-yellow-50'}
          iconColor={isAuthenticated ? 'text-green-600' : 'text-yellow-600'}
          badge={isAuthenticated ? 'Ready' : 'Waiting'}
          badgeVariant={isAuthenticated ? 'success' : 'warning'}
          title="Session"
          description={isAuthenticated ? 'Token stored' : 'No active session'}
        />
      </div>

      <SectionTitle title="Infrastructure Status" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatusCard icon={Layers} iconBg="bg-green-50" iconColor="text-green-600" badge="Ready" badgeVariant="success" title="API Layer" description="Axios instance configured" />
        <StatusCard icon={Plug} iconBg="bg-green-50" iconColor="text-green-600" badge="Ready" badgeVariant="success" title="Interceptors" description="Request & response interceptors active" />
        <StatusCard icon={Shield} iconBg="bg-green-50" iconColor="text-green-600" badge="Ready" badgeVariant="success" title="Token Manager" description="localStorage utilities ready" />
        <StatusCard icon={Database} iconBg="bg-green-50" iconColor="text-green-600" badge="Ready" badgeVariant="success" title="Service Layer" description="Service placeholders established" />
        <StatusCard icon={Workflow} iconBg="bg-green-50" iconColor="text-green-600" badge="Ready" badgeVariant="success" title="Axios Instance" description="Base URL, timeout, JSON headers" />
        <StatusCard icon={Wrench} iconBg="bg-green-50" iconColor="text-green-600" badge="Operational" badgeVariant="success" title="Developer Toolkit" description="Dashboard of API utilities" />
        <StatusCard icon={Clock} iconBg="bg-green-50" iconColor="text-green-600" badge="Operational" badgeVariant="success" title="History" description="Local storage history persistence" />
        <StatusCard icon={Activity} iconBg="bg-green-50" iconColor="text-green-600" badge="Operational" badgeVariant="success" title="Health Check" description="System connectivity verification" />
        <StatusCard icon={Shield} iconBg="bg-green-50" iconColor="text-green-600" badge="Operational" badgeVariant="success" title="Role Verification" description="Role authorization tester" />
        <StatusCard icon={CheckCircle} iconBg="bg-green-50" iconColor="text-green-600" badge="Operational" badgeVariant="success" title="Permission Matrix" description="Module access control verification" />
        <StatusCard icon={Settings} iconBg="bg-green-50" iconColor="text-green-600" badge="Operational" badgeVariant="success" title="Settings" description="Local app configuration" />
        <StatusCard icon={Activity} iconBg="bg-green-50" iconColor="text-green-600" badge="Operational" badgeVariant="success" title="Diagnostics" description="System health tools" />
        <StatusCard icon={Wrench} iconBg="bg-green-50" iconColor="text-green-600" badge="Operational" badgeVariant="success" title="Developer Preferences" description="Local UI settings" />
      </div>
    </div>
  );
}
