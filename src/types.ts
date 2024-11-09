export enum UserRole {
  "TeamMember" = 1,
  "School",
  "Organizer",
}

export interface MenuItem {
  href: string,
  label: string,
  roles: UserRole[]
}