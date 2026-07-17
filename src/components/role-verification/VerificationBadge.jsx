import { CheckCircle, XCircle, Clock, HelpCircle, MinusCircle } from 'lucide-react';
import Badge from '../ui/Badge';

export default function VerificationBadge({ status }) {
  const map = {
    Verified: { variant: 'success', icon: CheckCircle },
    Denied: { variant: 'danger', icon: XCircle },
    Pending: { variant: 'warning', icon: Clock },
    Unknown: { variant: 'default', icon: HelpCircle },
    'Not Tested': { variant: 'secondary', icon: MinusCircle }
  };
  
  const config = map[status] || map['Unknown'];
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className="flex items-center gap-1.5 px-2.5 py-1">
      <Icon className="w-3.5 h-3.5" />
      {status}
    </Badge>
  );
}
