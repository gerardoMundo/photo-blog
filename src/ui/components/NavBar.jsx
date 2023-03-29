import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { MenuOutlined } from '@mui/icons-material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { startLogOut } from '../../store/auth/thunks';

export const NavBar = ({ drawerWidth }) => {
  const dispatch = useDispatch();

  const onLogOut = () => {
    dispatch(startLogOut());
  };

  return (
    <AppBar
      position='fixed'
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          edge='start'
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuOutlined />
        </IconButton>
        <Grid container justifyContent='space-between' alignItems='center'>
          <Typography variant='h6' noWrap component='div'>
            Photo Blog
          </Typography>

          <IconButton onClick={onLogOut}>
            <ExitToAppIcon color='action' />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

NavBar.propTypes = {
  drawerWidth: PropTypes.number,
};
