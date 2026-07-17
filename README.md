# Tellin API Testing Client

An internal developer tool built to test Laravel APIs and Single Sign-On (SSO) integrations. It provides a lightweight, modern React interface for verifying connectivity, testing endpoints, validating role permissions, and inspecting payloads.

## Architecture

This project is built using:
- **React 18** for UI components
- **Vite** as the fast build tool
- **TailwindCSS** for atomic styling
- **Axios** for API network requests
- **Lucide React** for consistent SVG icons

The application is structured logically to separate concerns:
- `src/components`: Reusable UI elements (`ui/`, `common/`) and domain-specific features (`explorer/`, `toolkit/`, etc.).
- `src/config`: App-wide configuration, module definitions (`apiModules.js`), endpoints (`apiEndpoints.js`), and roles.
- `src/context`: React Context providers for Auth, Toast, and Preferences.
- `src/pages`: Top-level view components mapping to routes.
- `src/routes`: Route definitions using React Router (supports Lazy Loading and Suspense).
- `src/services`: Service layer handling API communications (e.g., `authService.js`).
- `src/utils`: Helper functions and storage utilities.

## Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## Available Features

- **Authentication**: Single Sign-On (SSO) mock/test flow.
- **API Explorer**: Module-by-module navigation and discovery of available backend endpoints.
- **Request Builder & Response Viewer**: Test endpoints dynamically and view detailed JSON payloads.
- **Role Verification**: Verify endpoint access against defined RBAC roles (`Super Admin`, `Admin`, `Editor`).
- **Developer Toolkit**: Quick diagnostics and local storage management.
- **Settings & Preferences**: Manage UI themes, JSON formatting, and request timeouts.

## Developer Workflow

### How Authentication Works
The app uses an `AuthContext` to manage the session. Tokens are stored in `localStorage` via `src/utils/tokenStorage.js`. Axios interceptors (`src/config/api.js`) automatically attach the Bearer token to outgoing requests and handle 401/403 errors seamlessly.

### How API Explorer Works
It reads from `src/config/apiModules.js` to build the sidebar and `src/config/apiEndpoints.js` to display available actions. Selecting an endpoint populates the Request Builder.

### How Request Builder Works
Accepts user input for Path Variables, Query Parameters, Headers, and JSON Body. Executing the request triggers the corresponding service layer function (if specified) or a direct configured Axios call.

### How to Add New API Modules
1. Open `src/config/apiModules.js`.
2. Add a new object following the existing schema (id, title, description, icon, status).
3. The API Explorer and Role Verification pages will instantly reflect this new module.

### How to Add New Endpoints
1. Open `src/config/endpoints.js` (for constants) and `src/config/apiEndpoints.js`.
2. Map the new endpoint using the exact HTTP method, path, and module reference.
3. Add any `developerNotes` for testing tips.

## Future Improvements

- Add request code-snippet generation (cURL, fetch).
- Integrate an automatic Swagger/OpenAPI spec importer.
- Support file uploads in the Request Builder.
