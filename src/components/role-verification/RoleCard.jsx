import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Shield } from 'lucide-react';

export default function RoleCard({ role, isActive, onSelect }) {
  return (
    <Card 
      className={`p-4 cursor-pointer transition-all duration-200 ${isActive ? 'ring-2 ring-indigo-500 bg-indigo-50/10' : 'hover:border-indigo-300'}`}
      onClick={() => onSelect(role)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-${role.badgeColor}-100`}>
            <Shield className={`w-5 h-5 text-${role.badgeColor}-600`} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{role.name}</h3>
            <p className="text-xs text-gray-500 font-medium mt-0.5">Level: {role.expectedAccessLevel}</p>
          </div>
        </div>
        <Badge variant={isActive ? 'success' : 'default'}>
          {isActive ? 'Selected' : 'Select'}
        </Badge>
      </div>
      <p className="text-sm text-gray-600 line-clamp-2">{role.description}</p>
    </Card>
  );
}
