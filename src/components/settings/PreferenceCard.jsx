import Card from '../ui/Card';

export default function PreferenceCard({ title, description, children }) {
  return (
    <Card className="p-5 flex flex-col gap-4">
      <div>
        <h3 className="font-bold text-gray-900">{title}</h3>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      <div className="flex-1">
        {children}
      </div>
    </Card>
  );
}
