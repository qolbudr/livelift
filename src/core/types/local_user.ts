import { Packages } from "@prisma/client"

export type LocalUser = () => {
  id: string,
  email: string,
  name: string,
  password: string,
  phone: string,
  packageId: number,
  tenant: string,
  createdAt: string,
  updatedAt: string,
  package: Packages,
}