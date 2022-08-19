export interface SmallUserDto{
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: RoleDto;
  createdAt: string;
}

export interface RoleDto{
  id: number;
  name: string;
}
