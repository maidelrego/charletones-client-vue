import type { Stats } from "./Stats"

export interface User {
  _id: string,
  email: string,
  fullName: string,
  roles: string[],
  updatedAt: string,
  createdAt: string
  cloudinary_id: string,
  avatar: string,
  stats?: Stats[]
}