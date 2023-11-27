import { cloneElement, useState } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useColorScheme,
  useScrollTrigger,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdBrightness4, MdOutlineLogout } from "react-icons/md";
import { BiUserPlus } from "react-icons/bi";
import { HiMenuAlt3 } from "react-icons/hi";
import { useLogout } from "../../features/authentication";
import ProfileAvatar from "./ProfileAvatar";
import MobileHeader from "./MobileHeader";
import Logo from "../../assets/logo.webp";

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const Header = () => {
  const { mode, setMode } = useColorScheme();

  const navigate = useNavigate();

  const activeUser = useSelector((state) => state.user.user);
  const logout = useLogout();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleMobileMenu = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const openHomePage = () => {
    navigate("/");
  };

  const openRegisterPage = () => {
    navigate("/auth");
  };

  const handleToggleTheme = () => {
    mode === "dark" ? setMode("light") : setMode("dark");
  };

  return (
    <>
      <ElevationScroll>
        <AppBar
          component="nav"
          sx={{
            backgroundColor: `${
              mode === "dark"
                ? "rgba(10, 25, 41, 0.7)"
                : "rgba(255, 255, 255, 0.8)"
            }`,
            backdropFilter: "blur(8px)",
            zIndex: 100,
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <IconButton
              color="primary"
              onClick={toggleMobileMenu}
              sx={{ display: { lg: "none" } }}
            >
              <HiMenuAlt3 style={{ width: "28", height: "28" }} />
            </IconButton>

            <Stack direction="row" spacing={5}>
              <Link
                component="button"
                onClick={openHomePage}
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                <img src={Logo} alt="logo" height={65} width={65} />
              </Link>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <IconButton
                title={mode === "dark" ? "Light mode" : "Dark mode"}
                color="primary"
                onClick={handleToggleTheme}
              >
                <MdBrightness4 style={{ width: "27", height: "27" }} />
              </IconButton>

              {activeUser ? (
                <>
                  <Tooltip title="Your account">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      sx={{
                        alignItems: "center",
                        justifyContent: "center",
                        height: 40,
                        width: 40,
                      }}
                    >
                      <ProfileAvatar width={30} height={30} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1,
                        mr: 1,
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <Box px={2.5} pb={1}>
                      <Typography>Welcome</Typography>
                      <Typography fontWeight={600}>
                        {activeUser?.username}
                      </Typography>
                    </Box>

                    <Divider />

                    <MenuItem onClick={logout}>
                      <ListItemIcon>
                        <MdOutlineLogout />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    endIcon={<BiUserPlus />}
                    onClick={openRegisterPage}
                    sx={{ display: { xs: "none", sm: "inline-flex" } }}
                  >
                    Login
                  </Button>
                  <IconButton
                    color="primary"
                    onClick={openRegisterPage}
                    sx={{ display: { xs: "inline-flex", sm: "none" } }}
                  >
                    <BiUserPlus style={{ width: "27", height: "27" }} />
                  </IconButton>
                </>
              )}
            </Stack>
          </Toolbar>
          <Divider />
        </AppBar>
      </ElevationScroll>
      <MobileHeader
        isDrawerOpen={isDrawerOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
    </>
  );
};

export default Header;
