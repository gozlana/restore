import {
  AppBar,
  Badge,
  Box,
  Drawer,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  DarkMode,
  LightMode,
  ShoppingCart,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setDarkMode } from "./uiSlice";
import { useFetchBasketQuery } from "../../features/basket/basketApi";
import UserMenu from "./UserMenu";
import { useUserInfoQuery } from "../../features/account/accountApi";
import logo from "../../assets/logo.png";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import InputBase from "@mui/material/InputBase";



const midLinks = [
  { title: "home", path: "/" },
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const navStyles = {
  color: "inherit",
  typography: "subtitle1",
  textDecoration: "none",
  px: 1.7,
  py: 2,
  mx: 0.5,
  fontWeight: 800,
  letterSpacing: 1.2,
  position: "relative",
  transition: "all .25s ease",

  "&:hover": {
    color: "#FFD54F",
    backgroundColor: "rgba(255,255,255, .08)",
    borderRadius: "8px"
  },

  "&::after": {
    content: '""',
    position: "absolute",
    left: "50%",
    bottom: 8,
    width: 0,
    height: 3,
    borderRadius: "999px",
    background: "#FFD54F",
    transform: "translateX(-50%)",
    transition: "width .25s ease",
  },

  "&.active": {
    color: "#fff",
  },

  "&.active::after": {
    width: "55%",
  },
};

export default function NavBar() {
  const { data: user } = useUserInfoQuery();
  const isLoggedIn = !!user?.email;
  const { isLoading, darkMode } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  const { data: basket } = useFetchBasketQuery();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");


  const itemCount =
    basket?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            component={NavLink}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              gap: 1,
              flexShrink: 0,
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Restore"
              sx={{
                height: { xs: 30, md: 36 },
                width: "auto",
                display: "block",
                background: "transparent"
              }}
            />
          </Box>

          <IconButton onClick={() => dispatch(setDarkMode())}>
            {darkMode ? (
              <DarkMode />
            ) : (
              <LightMode sx={{ color: "yellow" }} />
            )}
          </IconButton>
        </Box>

        <List sx={{ display: { xs: "none", md: "flex" } }}>
          {midLinks.map(({ title, path }) => (
            <ListItem
              component={NavLink}
              to={path}
              key={path}
              end={path === "/"}
              sx={navStyles}
            >
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        <Box display="flex" alignItems="center">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              width: searchOpen ? 260 : 42,
              height: 42,
              borderRadius: "999px",
              transition: "all .3s ease",
              bgcolor: searchOpen ? "rgba(255,255,255,.15)" : "transparent",
              mr: 1.5,
            }}
          >
            <IconButton
              onClick={() => setSearchOpen(true)}
              sx={{
                color: "white",
                width: 42,
                height: 42,
                "&:hover": {
                  color: "#FFD54F",
                },
              }}
            >
              <SearchRoundedIcon />
            </IconButton>

            {searchOpen && (
              <>
                <InputBase
                  autoFocus
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search products..."
                  sx={{
                    flex: 1,
                    color: "white",
                    ml: 1,
                    input: {
                      color: "white",
                      "&::placeholder": {
                        color: "rgba(255,255,255,.75)",
                      },
                    },
                  }}
                />

                <IconButton
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchText("");
                  }}
                  sx={{ color: "white" }}
                >
                  <CloseRoundedIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </Box>
          
          <IconButton
            component={Link}
            to="/basket"
            size="large"
            sx={{ color: "inherit" }}
          >
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          {isLoggedIn ? (
            <UserMenu user={user} />
          ) : (
            <List sx={{ display: { xs: "none", md: "flex" } }}>
              {rightLinks.map(({ title, path }) => (
                <ListItem
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={navStyles}
                >
                  {title.toUpperCase()}
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Toolbar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 285,
            maxWidth: "82vw",
            borderTopRightRadius: 22,
            borderBottomRightRadius: 22,
            overflow: "hidden",
            boxShadow: 6,
          },
        }}
      >
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column", bgcolor: "background.paper" }}>
          <Box
            sx={{
              px: 3,
              py: 2.2,
              background: "linear-gradient(135deg, #1565c0, #42a5f5)",
              color: "white",
            }}
          >
            <Typography variant="h5" fontWeight={800}>
              RESTORE
            </Typography>

            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Modern Shopping
            </Typography>
          </Box>

          <Divider />

          <List sx={{ px: 1.5, py: 1 }}>
            {[
              { title: "Catalog", path: "/catalog", icon: <StorefrontOutlinedIcon /> },
              { title: "About", path: "/about", icon: <InfoOutlinedIcon /> },
              { title: "Contact", path: "/contact", icon: <ContactMailOutlinedIcon /> },
              { title: "Login", path: "/login", icon: <LoginOutlinedIcon /> },
              { title: "Register", path: "/register", icon: <PersonAddOutlinedIcon /> },
            ].map((item) => (
              <ListItem
                key={item.path}
                component={NavLink}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                sx={{
                  my: 0.25,
                  px: 2,
                  py: 1.15,
                  borderRadius: 3,
                  textDecoration: "none",
                  color: "text.secondary",
                  transition: "0.2s ease",

                  "&:hover": {
                    bgcolor: "action.hover",
                    color: "primary.main",
                    transform: "translateX(4px)",
                  },

                  "&.active": {
                    bgcolor: "primary.main",
                    color: "#fff",
                    boxShadow: 3,
                  },

                  "& .MuiListItemIcon-root": {
                    color: "inherit",
                    minWidth: 42,
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>

                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{
                    fontWeight: 700,
                    fontSize: "0.95rem",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {isLoading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress color="success" />
        </Box>
      )}
    </AppBar>
  );
}
