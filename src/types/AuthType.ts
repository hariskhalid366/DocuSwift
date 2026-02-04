export type AuthContextType = {
  user: any;
  loading: boolean;
  isAuthenticated: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  premium: boolean;
  purchasePremium: () => Promise<void>;
};
