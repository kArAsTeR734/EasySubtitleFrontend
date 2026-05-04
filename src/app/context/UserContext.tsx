import { createContext, type ReactNode } from 'react';
import type { UserInfo } from '@/entities/User/models/types.ts';
import { useInitializeUser } from '@/features/User/useInitUser.ts';

type AuthContextType = {
  user: UserInfo | null;
};

type Props = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: Props) => {
  const { data: user, isLoading } = useInitializeUser();

  if (isLoading){
    return <div>Loading...</div>
  }

  return (
    <AuthContext.Provider value={{ user: user ?? null }}>
      {children}
    </AuthContext.Provider>
  );
};

