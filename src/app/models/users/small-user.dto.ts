export interface SmallUserDto{
  id: number;
  fistName: string;
  lastName: string;
  email: string;
  role: RoleDto;
  createdAt: string;
}

export interface RoleDto{
  id: number;
  name: string;
}
