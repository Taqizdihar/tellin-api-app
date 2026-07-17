import PageHeader from '../components/layout/PageHeader';
import ContentContainer from '../components/layout/ContentContainer';
import EmptyState from '../components/common/EmptyState';
import { Search } from 'lucide-react';

export default function ResponseInspector() {
  return (
    <div>
      <PageHeader 
        title="Response Inspector" 
        description="View detailed JSON responses and headers"
      />
      <ContentContainer>
        <EmptyState
          icon={Search}
          title="No Response Data"
          description="Execute a request in the API Explorer first to view its response details here."
        />
      </ContentContainer>
    </div>
  );
}
