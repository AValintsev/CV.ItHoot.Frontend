export interface SmallUserDto{
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: RoleDto;
  createdAt: string;
  fullName:string;
}

export interface RoleDto{
  id: number;
  name: string;
}
