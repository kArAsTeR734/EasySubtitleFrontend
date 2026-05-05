import './Footer.scss';
import { GitHub } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: 1,
        borderColor: 'divider',
        py: 3,
        mt: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          maxWidth: 1200,
          mx: 'auto',
          px: 2,
        }}
      >
        {/* Левая часть: логотип */}
        <Box>
          <img src="/src/assets/Logo.svg" alt="PINN Automizer" style={{ height: 32 }} />
        </Box>

        {/* Центральная часть: О проекте + GitHub */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body1" fontWeight={600} gutterBottom>
            О PINN Automizer
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
            <GitHub fontSize="small" />
            <Link
              href="https://github.com/AridanWarlock/pinnAutomizer"
              target="_blank"
              underline="hover"
              color="text.secondary"
              variant="body2"
            >
              github.com/AridanWarlock/pinnAutomizer
            </Link>
          </Box>
        </Box>

        {/* Правая часть: Свяжитесь с нами */}
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="body1" fontWeight={600} gutterBottom>
            Свяжитесь с нами
          </Typography>
          <Link
            href="tel:+79999999999"
            underline="hover"
            color="text.secondary"
            variant="body2"
          >
            +7 (999) 999-99-99
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;