export const getTenantUrl = (): string => {
  const user = localStorage.getItem('user');
  const userData = user ? JSON.parse(user) : null;
  const tenant = userData?.tenant;

  if (!tenant) {
    throw new Error("Tenant URL not found");
  }

  return tenant;
}