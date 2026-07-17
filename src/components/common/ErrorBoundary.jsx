import { Component } from 'react';
import Button from '../ui/Button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-sm text-gray-500 mb-6">
              An unexpected error occurred in this component. Our team has been notified.
            </p>
            
            {import.meta.env.DEV && this.state.error && (
              <div className="text-left bg-gray-50 p-4 rounded-lg overflow-auto text-xs font-mono text-gray-800 mb-6 max-h-40">
                <p className="font-bold text-red-600 mb-1">{this.state.error.toString()}</p>
                <p>{this.state.errorInfo?.componentStack}</p>
              </div>
            )}

            <div className="flex justify-center gap-3">
              <Button onClick={() => window.location.reload()} variant="primary">
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry
              </Button>
              <Button onClick={() => window.location.href = '/'} variant="outline">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
