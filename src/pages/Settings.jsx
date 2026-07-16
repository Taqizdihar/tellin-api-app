import PageHeader from '../components/layout/PageHeader';
import ContentContainer from '../components/layout/ContentContainer';

export default function Settings() {
  return (
    <div>
      <PageHeader 
        title="Settings" 
        description="Configure API client preferences"
      />
      <ContentContainer>
        <p className="text-sm text-gray-500">Settings interface will be implemented here.</p>
      </ContentContainer>
    </div>
  );
}
