import { HashRouter, Route, Switch } from "react-router-dom";
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faMapPin, faLocationArrow } from '@fortawesome/free-solid-svg-icons';

import { withTracker } from "./withTracker";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import CodeView from "./components/CodeView";
import PhotoView from "./components/PhotoView";

import "./App.css";

library.add(faLocationArrow);
library.add(faMapPin);
dom.watch();

function NoMatch(): JSX.Element {
  return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <blockquote className="blockquote align-middle text-center">
        {"The requested page was not found"}
      </blockquote>
    </div>
  );
}

export default function App(): JSX.Element {
  return (
    <div id="app">
      <Header />
      <main id="main" className="flex-grow-1">
        <HashRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path="/" component={withTracker(HomeView)} />
            <Route path="/development" component={withTracker(CodeView)} />
            <Route path="/photography" component={withTracker(PhotoView)} />
            <Route path="*" component={NoMatch} />
          </Switch>
        </HashRouter>
      </main>
      <Footer />
    </div>
  );
}
