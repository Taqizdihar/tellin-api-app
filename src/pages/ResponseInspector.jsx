import PageHeader from '../components/layout/PageHeader';
import ContentContainer from '../components/layout/ContentContainer';

export default function ResponseInspector() {
  return (
    <div>
      <PageHeader 
        title="Response Inspector" 
        description="View detailed JSON responses and headers"
      />
      <ContentContainer>
        <p className="text-sm text-gray-500">Response Inspector interface will be implemented here.</p>
      </ContentContainer>
    </div>
  );
}
