import { HashRouter, Route, Switch } from "react-router-dom";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import {
  faHeart,
  faMapPin,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";

import { withTracker } from "./withTracker";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import HomeView from "./components/Home/HomeView";
import CodeView from "./components/Code/CodeView";
import PhotoView from "./components/Photo/PhotoView";
import Blog from "./components/Blog/Blog";

import "./App.css";
import { Box, Typography } from "@mui/material";
import { HomeViewProps } from "./types";

library.add(faHeart);
library.add(faLocationArrow);
library.add(faMapPin);
dom.watch();

function NoMatch(): JSX.Element {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="body1">
        {"The requested page was not found"}
      </Typography>
    </Box>
  );
}

export default function App(): JSX.Element {
  const homeProps: HomeViewProps = {
    fullname: "Nyla Khalil",
    profession: "Software Engineer",
  };

  return (
    <div id="app">
      <HashRouter basename={process.env.PUBLIC_URL}>
        <Header />
        <main id="main">
          <Switch>
            <Route
              exact
              path="/"
              component={withTracker(HomeView, homeProps)}
            />
            <Route path="/blog" component={withTracker(Blog)} />
            <Route path="/development" component={withTracker(CodeView)} />
            <Route path="/photography" component={withTracker(PhotoView)} />
            <Route path="*" component={NoMatch} />
          </Switch>
        </main>
        <Footer />
      </HashRouter>
    </div>
  );
}
