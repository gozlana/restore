import { Button, Divider, Fade, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import React from "react";
import { User } from "../models/user";
import { History, Logout, Person } from "@mui/icons-material";
import { useLogoutMutation } from "../../features/account/accountApi";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";


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

  const displayName = user.email.split("@")[0];

  return (
    <div>
      <Button
        onClick={handleClick}
        startIcon={<AccountCircleIcon />}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          color: "#fff",
          textTransform: "capitalize",
          fontWeight: 700,
          fontSize: "0.95rem",
          borderRadius: "999px",
          px: 1.7,
          py: 0.7,
          ml: 1,
          backgroundColor: "rgba(255,255,255,0.14)",
          border: "1px solid rgba(255,255,255,0.25)",
          boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.24)",
            transform: "translateY(-1px)",
          },
          transition: "all 0.2s ease",
        }}
      >
        {displayName}
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