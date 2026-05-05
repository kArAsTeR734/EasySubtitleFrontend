import { AppBar, Box, Button, Link as MuiLink, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux.ts';
import { modalSlice } from '@app/store/reducers/ModalSlice.ts';
import { useAuth } from '@/features/User/useAuth.ts';
import { useLogout } from '@/features/Logout/useLogout.ts';
import AuthorizationForm from '../AuthorizationForm';

const Header = () => {
  const { activeModal } = useAppSelector((state) => state.modalReducer);
  const { user } = useAuth();
  const { openModal, closeModal } = modalSlice.actions;
  const dispatch = useAppDispatch();
  const logoutMutate = useLogout();

  const menuItems = [
    { label: 'Документация', path: '/' },
    { label: 'PINN задачи', path: '/tasks' }
  ];

  const isAuthOpen = activeModal === 'auth';

  return (
    <>
      <AppBar
        position="static"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: 'grey.100',
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: 2 }}>
          {/* Левая часть: логотип */}
          <Box
            component={Link}
            to="/"
            sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flex: 1 }}
          >
            <img src="/src/assets/Logo.svg" alt="PINN Automizer" style={{ height: 32 }} />
          </Box>

          {/* Центральная часть: навигация */}
          <Box sx={{ display: 'flex', gap: 4, flex: 1, justifyContent: 'center' }}>
            {menuItems.map((item) => (
              <MuiLink
                key={item.path}
                component={Link}
                to={item.path}
                underline="hover"
                color="text.primary"
                variant="body1"
                sx={{ fontWeight: 500 }}
              >
                {item.label}
              </MuiLink>
            ))}
          </Box>

          {/* Правая часть: пользователь / вход */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, justifyContent: 'flex-end' }}>
            {user ? (
              <>
                <Typography variant="body1" color="text.secondary">
                  {user.login}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => logoutMutate.mutate()}
                >
                  Выйти
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                size="small"
                onClick={() => dispatch(openModal('auth'))}
              >
                Войти
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <AuthorizationForm
        isOpen={isAuthOpen}
        onClose={() => dispatch(closeModal())}
      />
    </>
  );
};

export default Header;