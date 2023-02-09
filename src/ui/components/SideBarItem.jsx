import PropTypes from 'prop-types';
import { TurnedInNot } from '@mui/icons-material';
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../store/journal/journalSlice';

export const SideBarItem = ({
  id,
  title = '',
  body = '',
  date,
  imageUrls = [],
}) => {
  const dispatch = useDispatch();

  const onClickActiveNote = () => {
    dispatch(setActiveNote({ id, title, body, date, imageUrls }));
  };

  const newTitle = useMemo(
    () => (title.length > 17 ? title.substring(0, 17) + '...' : title),
    [title]
  );

  return (
    <ListItem onClick={onClickActiveNote} disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container display='block'>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

SideBarItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  date: PropTypes.number,
  imageUrls: PropTypes.array,
};
