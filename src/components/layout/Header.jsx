import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  Badge,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { Suspense, lazy, useState } from "react";
import { orange } from "../../constants/color";
import {
  Add as AddIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
  Search as SearchIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  Videocam as VideocamIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../constants/config";
import { userNotExists } from "../../redux/reducers/auth";
import toast from "react-hot-toast";
import {
  setIsMobile,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
  setIsProfile,
} from "../../redux/reducers/misc";
import { resetNotificationCount } from "../../redux/reducers/chat";

const SearchDialog = lazy(() => import("../specific/Search"));
const NotificationDialog = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));
const ProfileDialog = lazy(() => import("../specific/ProfileDialog"));

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isSearch, isNotification, isNewGroup, isProfile } = useSelector(
    (state) => state.misc
  );
  const { notificationCount } = useSelector((state) => state.chat);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMobile = () => dispatch(setIsMobile(true));
  const openSearch = () => dispatch(setIsSearch(true));
  const openNewGroup = () => dispatch(setIsNewGroup(true));
  const openNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount());
  };
  const navigateToGroup = () => navigate("/groups");
  const videocallaction = () => (window.location.href = "https://chat-videocall.netlify.app");

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong");
    }
  };

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar position="static" sx={{ bgcolor: orange }}>
          <Toolbar>
            <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
              Dashboard
            </Typography>

            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* Always visible icons */}
              <IconBtn title="Search" icon={<SearchIcon />} onClick={openSearch} />
              <IconBtn
                title="Profile"
                icon={<PersonIcon />}
                onClick={() => dispatch(setIsProfile(true))}
              />
              <IconBtn
                title="Notifications"
                icon={<NotificationsIcon />}
                onClick={openNotification}
                value={notificationCount}
              />

              {/* Desktop-only icons */}
              <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                <IconBtn title="New Group" icon={<AddIcon />} onClick={openNewGroup} />
                <IconBtn
                  title="Manage Groups"
                  icon={<GroupIcon />}
                  onClick={navigateToGroup}
                />
                <IconBtn
                  title="Videocall"
                  icon={<VideocamIcon />}
                  onClick={videocallaction}
                />
                <IconBtn title="Logout" icon={<LogoutIcon />} onClick={logoutHandler} />
              </Box>

              {/* Mobile dropdown menu */}
              <Box sx={{ display: { xs: "flex", sm: "none" } }}>
                <IconButton color="inherit" onClick={handleMenuOpen}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    style: {
                      width: 200,
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      openNewGroup();
                    }}
                  >
                    <ListItemIcon>
                      <AddIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>New Group</ListItemText>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      navigateToGroup();
                    }}
                  >
                    <ListItemIcon>
                      <GroupIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Manage Groups</ListItemText>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      videocallaction();
                    }}
                  >
                    <ListItemIcon>
                      <VideocamIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Videocall</ListItemText>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      logoutHandler();
                    }}
                  >
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}

      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationDialog />
        </Suspense>
      )}

      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog />
        </Suspense>
      )}

      {isProfile && (
        <Suspense fallback={<Backdrop open />}>
          <ProfileDialog user={user} />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {value ? (
          <Badge badgeContent={value} color="error">
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};

export default Header;