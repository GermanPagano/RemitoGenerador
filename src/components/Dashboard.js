import React from 'react';
import { AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemText, Box, CssBaseline } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const drawerWidth = 240;

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut().then(() => {
      // Limpiar el localStorage al cerrar sesión
      localStorage.removeItem('user');
      navigate('/');
    });
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />

      {/* AppBar (Header) */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Logo y Título */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" noWrap component="div">
              Panel de Administración
            </Typography>
          </Box>

          {/* Bienvenida y Cerrar Sesión */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button color="inherit" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer (Barra lateral) */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            height: '100vh',
            backgroundColor: '#f5f5f5', // Color gris claro
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button onClick={() => navigate('/dashboard')}>
              <ListItemText primary="Inicio" />
            </ListItem>
            <ListItem button onClick={() => navigate('/dashboard/remito')}>
              <ListItemText primary="Remito" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Próximamente" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          width: 'calc(100% - 240px)', // Ancho relativo (ajustado para excluir el drawer)
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 2,
          minHeight: '100vh', // Altura completa del viewport
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;

