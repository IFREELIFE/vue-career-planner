/**
 * Maps backend roles to frontend route roles and target entry paths.
 * Some backend roles differ from the roles used in frontend routing/guards,
 * so normalization is required before navigation decisions.
 */
export const backendToFrontendRoleMap: Record<string, string> = {
  SCHOOL: 'SCHOOL_ADMIN',
  ENTERPRISE: 'COMPANY_ADMIN',
  ADMIN: 'PLATFORM_ADMIN'
}

export const roleRedirectMap: Record<string, string> = {
  STUDENT: '/student',
  SCHOOL_ADMIN: '/school/profile',
  COMPANY_ADMIN: '/company/jobs',
  PLATFORM_ADMIN: '/platform/dashboard'
}

export const normalizeRole = (role: string): string => {
  return backendToFrontendRoleMap[role] || role
}

export const getRedirectPathByRole = (role: string): string => {
  return roleRedirectMap[role] || '/'
}
