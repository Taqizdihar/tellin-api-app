import PageHeader from '../components/layout/PageHeader';
import ContentContainer from '../components/layout/ContentContainer';

export default function RequestHistory() {
  return (
    <div>
      <PageHeader 
        title="Request History" 
        description="Review past API requests and their status"
      />
      <ContentContainer>
        <p className="text-sm text-gray-500">Request History interface will be implemented here.</p>
      </ContentContainer>
    </div>
  );
}
