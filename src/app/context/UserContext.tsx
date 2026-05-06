import { createContext, type ReactNode } from 'react';
import type { UserInfo } from '@/entities/User/models/types.ts';
import { useInitializeUser } from '@/features/User/useInitUser.ts';
import { Box, CircularProgress } from '@mui/material';

type AuthContextType = {
  user: UserInfo | null;
};

type Props = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: Props) => {
  const { data: user, isLoading } = useInitializeUser();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress
          sx={{
            color: 'primary.100',
            '& .MuiCircularProgress-circle': {
              color: 'primary.main',
            },
          }}
        />
      </Box>
    );
  }

  return (
    <AuthContext.Provider value={{ user: user ?? null }}>
      {children}
    </AuthContext.Provider>
  );
};
