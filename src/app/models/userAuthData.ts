export interface UserAuthData {
   userEmail: string;
   displayName: string;
   userId: number;
   token: string;
   refreshToken: string;
   roles: [string];
}
