import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";

/**
 * Header Component utilizing MUI AppBar with routes
 *
 * @version 2.0.0
 * @author Nyla Khalil
 */
export default function Header() {
  return (
    <AppBar color="transparent" position="static" sx={{ boxShadow: 0 }}>
      <Toolbar disableGutters={true} sx={{ mr: "10px" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>
        <Link href="/#" color="inherit" underline="none" sx={{ mr: "10px" }}>
          About
        </Link>
        <Link
          href="/#/development"
          color="inherit"
          underline="none"
          sx={{ mr: "10px" }}
        >
          Development
        </Link>
        <Link
          href="/#/photography"
          color="inherit"
          underline="none"
          sx={{ mr: "10px" }}
        >
          Photography
        </Link>
      </Toolbar>
    </AppBar>
  );
}
