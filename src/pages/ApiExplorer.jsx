import PageHeader from '../components/layout/PageHeader';
import ContentContainer from '../components/layout/ContentContainer';

export default function ApiExplorer() {
  return (
    <div>
      <PageHeader 
        title="API Explorer" 
        description="Test and interact with Laravel endpoints"
      />
      <ContentContainer>
        <p className="text-sm text-gray-500">API Explorer interface will be implemented here.</p>
      </ContentContainer>
    </div>
  );
}
