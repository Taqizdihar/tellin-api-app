import { 
  Lock, 
  Users, 
  Shield, 
  Key, 
  FileText, 
  Folder, 
  Settings, 
  BookOpen, 
  MessageSquare, 
  LayoutDashboard, 
  Settings2 
} from 'lucide-react';

export const apiModules = [
  {
    id: 'authentication',
    title: 'Authentication',
    description: 'Handles login, logout, session restoration and current user.',
    icon: Lock,
    status: 'Ready',
    serviceName: 'authService',
    futureEndpointCount: 4,
    developerNotes: 'Core authentication endpoints. Handles token issuance and validation.'
  },
  {
    id: 'users',
    title: 'Users',
    description: 'Will manage user CRUD endpoints.',
    icon: Users,
    status: 'Pending',
    serviceName: 'userService',
    futureEndpointCount: 5,
    developerNotes: 'User management operations including profile updates and user listings.'
  },
  {
    id: 'roles',
    title: 'Roles',
    description: 'Role management and assignment.',
    icon: Shield,
    status: 'Coming Soon',
    serviceName: 'roleService',
    futureEndpointCount: 3,
    developerNotes: 'Defines system roles for RBAC integration.'
  },
  {
    id: 'permissions',
    title: 'Permissions',
    description: 'Granular access control settings.',
    icon: Key,
    status: 'Coming Soon',
    serviceName: 'permissionService',
    futureEndpointCount: 3,
    developerNotes: 'Defines permissions attached to roles.'
  },
  {
    id: 'articles',
    title: 'Articles',
    description: 'Content management for blog posts or articles.',
    icon: FileText,
    status: 'Pending',
    serviceName: 'articleService',
    futureEndpointCount: 6,
    developerNotes: 'Full CRUD operations for publishing content.'
  },
  {
    id: 'categories',
    title: 'Categories',
    description: 'Article categorization and taxonomy.',
    icon: Folder,
    status: 'Coming Soon',
    serviceName: 'categoryService',
    futureEndpointCount: 4,
    developerNotes: 'Organizes articles into specific hierarchies.'
  },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Will expose application configuration APIs.',
    icon: Settings,
    status: 'Ready',
    serviceName: 'settingService',
    futureEndpointCount: 2,
    developerNotes: 'Global application preferences and metadata.'
  },
  {
    id: 'knowledge-base',
    title: 'Knowledge Base',
    description: 'Support articles and documentation resources.',
    icon: BookOpen,
    status: 'Coming Soon',
    serviceName: 'kbService',
    futureEndpointCount: 5,
    developerNotes: 'Provides endpoints for FAQ and help documents.'
  },
  {
    id: 'forum',
    title: 'Forum',
    description: 'Community discussions and threads.',
    icon: MessageSquare,
    status: 'Coming Soon',
    serviceName: 'forumService',
    futureEndpointCount: 8,
    developerNotes: 'Thread management, replies, and community moderation.'
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'Aggregated metrics and analytics.',
    icon: LayoutDashboard,
    status: 'Pending',
    serviceName: 'dashboardService',
    futureEndpointCount: 3,
    developerNotes: 'Returns aggregated data for charts and overviews.'
  },
  {
    id: 'system',
    title: 'System',
    description: 'System health, logs, and maintenance tasks.',
    icon: Settings2,
    status: 'Coming Soon',
    serviceName: 'systemService',
    futureEndpointCount: 2,
    developerNotes: 'Provides health-check and diagnostic information.'
  }
];
