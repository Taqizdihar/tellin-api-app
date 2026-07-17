import PageHeader from '../components/layout/PageHeader';
import ContentContainer from '../components/layout/ContentContainer';
import HistoryCard from '../components/toolkit/HistoryCard';
import EnvironmentCard from '../components/toolkit/EnvironmentCard';
import SessionCard from '../components/toolkit/SessionCard';
import HealthCard from '../components/toolkit/HealthCard';
import SystemInfoCard from '../components/toolkit/SystemInfoCard';
import QuickActionCard from '../components/toolkit/QuickActionCard';

export default function DeveloperToolkit() {
  return (
    <div className="h-full flex flex-col">
      <PageHeader 
        title="Developer Toolkit" 
        description="Collection of utilities for API development and debugging"
      />
      <ContentContainer className="flex-1 bg-transparent border-none shadow-none p-0 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          <div className="lg:col-span-1">
            <HistoryCard />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <HealthCard />
              <SessionCard />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EnvironmentCard />
              <SystemInfoCard />
            </div>
            <QuickActionCard />
          </div>
        </div>
      </ContentContainer>
    </div>
  );
}
