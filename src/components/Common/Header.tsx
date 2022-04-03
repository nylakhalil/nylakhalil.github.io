import { SyntheticEvent, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";

const pages = [
  { name: "Home", location: "/" },
  { name: "Development", location: "/development" },
  { name: "Photography", location: "/photography" },
];

/**
 * Responsive Header Component utilizing MUI AppBar with routes
 *
 * @version 2.0.0
 * @author Nyla Khalil
 */
export default function Header() {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState<string>(
    history.location.pathname
  );
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleRouteChange = (event: SyntheticEvent) => {
    setAnchorElNav(null);
    const page = pages.find((p) => p.name === event.currentTarget.textContent);
    if (page?.location) {
      setCurrentPage(page.location);
      history.push(page.location);
    }
  };

  return (
    <AppBar color="transparent" position="static" sx={{ boxShadow: 0 }}>
      <Toolbar disableGutters={true} sx={{ mr: "10px" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {pages.map((page: any) => (
            <Button
              key={page.name}
              color={page.location === currentPage ? "primary" : "inherit"}
              sx={{ mr: "10px" }}
              onClick={handleRouteChange}
            >
              {page.name}
            </Button>
          ))}
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <FontAwesomeIcon icon={faBars} />
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
            {pages.map((page) => (
              <MenuItem key={page.name} onClick={handleRouteChange}>
                {page.name}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
