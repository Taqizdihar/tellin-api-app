import Card from '../ui/Card';
import Button from '../ui/Button';

export default function ActionCard({ actions }) {
  return (
    <Card className="p-5">
      <h3 className="font-bold text-gray-900 mb-4">Application Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, idx) => (
          <Button 
            key={idx} 
            variant={action.variant || 'outline'} 
            className="w-full justify-start"
            onClick={action.onClick}
          >
            {action.icon && <action.icon className="w-4 h-4 mr-2" />}
            {action.label}
          </Button>
        ))}
      </div>
    </Card>
  );
}
