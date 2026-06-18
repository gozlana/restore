import { Button, Divider, Fade, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import React from "react";
import { User } from "../models/user";
import { History, Logout, Person} from "@mui/icons-material";
import { useLogoutMutation } from "../../features/account/accountApi";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  user: User;
};

export default function UserMenu({ user }: Props) {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate('/');
    } catch (err) {
      console.error('Logout failed', err)
    }
  }

  return (
    <div>
      <Button 
        onClick={handleClick}
        color="inherit"
        size="large"
        sx={{fontsize: '1.1rem'}}
      >
        {user?.email ?? 'Account'}
      </Button>
      <Menu
        id="fade-menu"
        slotProps={{
          list: {
            'aria-labelledby': 'fade-button',
          },
        }}
        slots={{ transition: Fade }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText>My profile</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to={`/orders`}>
          <ListItemIcon>
            <History />
          </ListItemIcon>
          <ListItemText>My orders</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}