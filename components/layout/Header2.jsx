"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Logout"];

function Header2() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const session = useSession();
  const status = session.status;
  const user = session.data?.user;
  let name = user?.name;
  if (name && name.includes(" ")) {
    name = name.split(" ")[0];
  }
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ background: "#8296A9" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              className="w-24 h-16"
              src="https://png.pngtree.com/png-clipart/20220903/ourmid/pngtree-chef-hat-and-cooking-logo-png-image_6136205.png"
              alt=""
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem  onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  {" "}
                  <Link href={"/"}>Home</Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  {" "}

                  <Link href="/pages/products">Products</Link>

                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  {" "}
                  <Link href="/pages/about">About </Link>
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              className="w-24 h-16"
              src="https://png.pngtree.com/png-clipart/20220903/ourmid/pngtree-chef-hat-and-cooking-logo-png-image_6136205.png"
              alt=""
            />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <div className="flex justify-evenly gap-4">
              <Link href={"/"}>Home</Link>
              <Link href={"/pages/products"}>Products</Link>
              <Link href={"/pages/about"}>About </Link>
            </div>
          </Box>
          {status === "authenticated" && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={user?.image} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={handleCloseUserMenu}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <Typography sx={{ display: "flex", flexDirection: "column" }}>
                    <Link href="/pages/profile">Profile</Link>
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={handleCloseUserMenu}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <Typography sx={{ display: "flex", flexDirection: "column" }}>
                    <Button onClick={() => signOut()}>Sign out</Button>
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
          {status === "unauthenticated" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Link href={"/pages/login"} className="font-semibold">
                {" "}
                تسجيل الدخول
              </Link>
              <Link
                className="btn bg-red-700 hover:bg-red-900 text-white"
                href={"/pages/signup"}
              >
                {" "}
                سجل معانا
              </Link>
            </Box>
          )}
          {status === "loading" && (
            <div>
              <span className="loading loading-dots loading-md"></span>
            </div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header2;
