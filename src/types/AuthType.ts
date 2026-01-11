export type AuthContextType = {
  user: any;
  loading: boolean;
  isAuthenticated: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  register: () => Promise<void>;
};
