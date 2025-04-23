export const getTenantUrl = (): string => {
  const user = localStorage.getItem('user');
  const userData = user ? JSON.parse(user) : null;
  const tenant = userData?.tenant;

  if (!tenant) {
    throw new Error("Akun belum aktif harap hubungi admin");
  }

  return tenant;
}