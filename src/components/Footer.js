import ReactGA from "react-ga";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  fa500px,
} from "@fortawesome/free-brands-svg-icons";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

function Copyright() {
  return (
    <Typography variant="caption" color="text.secondary" align="center">
      {"Copyright © Nyla Khalil"} {new Date().getFullYear()}
    </Typography>
  );
}

function Links() {
  function handleClick(title: String) {
    ReactGA.event({
      category: "Site Footer",
      action: "Selected Social Icon: " + title,
      label: "Navigation",
    });
  }

  return (
    <Stack direction="row" spacing={2}>
      <Link
        href="https://500px.com/nyla"
        underline="none"
        onClick={() => {
          handleClick("500px");
        }}
      >
        <FontAwesomeIcon icon={fa500px} color="black" />
      </Link>
      <Link
        href="https://www.linkedin.com/in/nylakhalil/"
        underline="none"
        onClick={() => {
          handleClick("linkedin");
        }}
      >
        <FontAwesomeIcon icon={faLinkedin} color="black" />
      </Link>
      <Link
        href="https://github.com/nylakhalil"
        underline="none"
        onClick={() => {
          handleClick("github");
        }}
      >
        <FontAwesomeIcon icon={faGithub} color="black" />
      </Link>
    </Stack>
  );
}

/**
 * Footer Component with Social Icons and Copyright
 *
 * @version 2.0.0
 * @author Nyla Khalil
 */
export default function Footer() {
  return (
    <footer id="footer">
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          ml: "10px",
          mb: "10px",
          mr: "10px",
        }}
      >
        <Links />
        <Copyright />
      </Box>
    </footer>
  );
}
