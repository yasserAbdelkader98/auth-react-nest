export interface AuthContextType {
  isLogged: boolean;
  userId: string;
  loginContext: (id: string) => void;
  logoutContext: () => void;
}
