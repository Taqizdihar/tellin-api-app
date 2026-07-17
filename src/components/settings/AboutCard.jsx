import Card from '../ui/Card';
import Badge from '../ui/Badge';

export default function AboutCard() {
  return (
    <Card className="p-5">
      <h3 className="font-bold text-gray-900 mb-4">About Tellin API App</h3>
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-gray-700">Project Description</h4>
          <p className="text-sm text-gray-500 mt-1">
            An internal developer tool built to test Laravel APIs and Single Sign-On (SSO) integrations. It provides a lightweight, modern React interface for verifying connectivity, testing endpoints, validating role permissions, and inspecting payloads.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-700">Technology Stack</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="secondary">React 18</Badge>
            <Badge variant="secondary">Vite</Badge>
            <Badge variant="secondary">TailwindCSS</Badge>
            <Badge variant="secondary">Axios</Badge>
            <Badge variant="secondary">Lucide React</Badge>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-700">Developer Notes</h4>
          <p className="text-sm text-gray-500 mt-1">
            Ensure all API routes are correctly mapped in endpoints.js. Features must rely on PreferenceContext for state management.
          </p>
        </div>
        <div className="pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-400">Version History: 1.0.0 (Initial Release)</span>
        </div>
      </div>
    </Card>
  );
}
