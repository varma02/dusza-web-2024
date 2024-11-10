export enum UserRole {
  "TeamMember" = 1,
  "School" = 2,
  "Organizer" = 3,
}

export interface MenuItem {
  href: string,
  label: string,
  roles: UserRole[]
}