export const UserRoles = {
  User: 'User',
  Moderator: 'Moderator',
  Admin: 'Admin'
} as const;

export type UserRole = typeof UserRoles