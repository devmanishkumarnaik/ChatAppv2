import React from 'react';
import { Dialog, DialogTitle, IconButton, DialogContent } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setIsProfile } from '../../redux/reducers/misc';
import Profile from './Profile'; // Adjust path as needed

const ProfileDialog = ({ user }) => {
  const dispatch = useDispatch();
  const { isProfile } = useSelector((state) => state.misc);

  const handleClose = () => {
    dispatch(setIsProfile(false));
  };

  return (
    <Dialog
      open={isProfile}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '12px',
          background: 'linear-gradient(145deg, #1a1a1a, #2a2a2a)',
          color: 'white'
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        My Profile
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Profile user={user} />
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
