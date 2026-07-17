import { Loader2, Play } from 'lucide-react';
import Button from '../ui/Button';

export default function ExecuteButton({ onClick, loading, disabled }) {
  return (
    <Button
      onClick={onClick}
      disabled={loading || disabled}
      className="gap-2"
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Executing...
        </>
      ) : (
        <>
          <Play className="w-4 h-4" />
          Execute Request
        </>
      )}
    </Button>
  );
}
