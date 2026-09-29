import type { Access, FieldAccess, PayloadRequest } from 'payload'

export type UserRole = 'admin' | 'editor'

type UserWithRoles = {
  roles?: null | UserRole[]
}

/**
 * Reads the `roles` array off `req.user` regardless of its runtime shape.
 * Kept defensive because the generated `User` type is only available after
 * `payload generate:types` has run.
 */
export const getRoles = (user: unknown): UserRole[] => {
  const roles = (user as null | UserWithRoles)?.roles
  return Array.isArray(roles) ? roles : []
}

/** Open to everyone, including anonymous visitors. */
export const anyone: Access = () => true

export const isAdmin: Access = ({ req }) => getRoles(req.user).includes('admin')

export const isAdminOrEditor: Access = ({ req }) => {
  const roles = getRoles(req.user)
  return roles.includes('admin') || roles.includes('editor')
}

/**
 * Gate for the admin panel itself. Unlike `Access`, this must resolve to a
 * plain boolean — Payload will not accept a query here.
 */
export const canAccessAdmin = ({ req }: { req: PayloadRequest }): boolean => {
  const roles = getRoles(req.user)
  return roles.includes('admin') || roles.includes('editor')
}

/** Admins can manage everyone; any signed-in user can read/update themselves. */
export const adminOrSelf: Access = ({ req }) => {
  if (!req.user) return false
  if (getRoles(req.user).includes('admin')) return true
  return { id: { equals: req.user.id } }
}

/** Anonymous visitors only ever see published documents; staff see everything. */
export const publishedOrStaff: Access = ({ req }) => {
  const roles = getRoles(req.user)
  if (roles.includes('admin') || roles.includes('editor')) return true
  return { _status: { equals: 'published' } }
}

/** Field-level guard: only admins may write this field. */
export const isAdminFieldLevel: FieldAccess = ({ req }) =>
  getRoles(req.user).includes('admin')
