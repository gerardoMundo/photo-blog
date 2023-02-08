import { Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import { NavBar } from '../../ui/components/NavBar';
import { SideBar } from '../../ui/components/SideBar';

export const JournalLayout = ({ children }) => {
  const drawerWidth = 240;

  return (
    <Box sx={{ display: 'flex' }} className='animate__animated animate__fadeIn'>
      <NavBar drawerWidth={drawerWidth} />

      <SideBar drawerWidth={drawerWidth} />

      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
};
