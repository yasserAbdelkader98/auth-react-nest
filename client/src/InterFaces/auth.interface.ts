export interface AuthContextType {
  isLogged: boolean;
  userId: string;
  loginContext: (token: string, id: string) => void;
  logoutContext: () => void;
}