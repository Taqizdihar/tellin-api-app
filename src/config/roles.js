export const roles = [
  {
    id: 'super-admin',
    name: 'Super Admin',
    description: 'Full system access including configuration and sensitive data.',
    priority: 1,
    badgeColor: 'indigo',
    expectedAccessLevel: 'All Modules',
    developerNotes: 'Should return 200 OK for every single endpoint.'
  },
  {
    id: 'admin',
    name: 'Admin',
    description: 'Management access for standard operational tasks.',
    priority: 2,
    badgeColor: 'blue',
    expectedAccessLevel: 'Standard Modules',
    developerNotes: 'Cannot access System, Roles, or Permissions modules.'
  },
  {
    id: 'editor',
    name: 'Editor',
    description: 'Content management access only.',
    priority: 3,
    badgeColor: 'green',
    expectedAccessLevel: 'Content Only',
    developerNotes: 'Only permitted to access Articles, Categories, Knowledge Base.'
  }
];
