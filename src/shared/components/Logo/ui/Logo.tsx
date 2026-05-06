import { Box, Typography } from '@mui/material';
import { VscCircuitBoard } from 'react-icons/vsc';

export const Logo = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <VscCircuitBoard size={36} color="#1976d2" />
    <Typography variant="h6" fontWeight={700} color="primary.main">
      PINN Automizer
    </Typography>
  </Box>
);