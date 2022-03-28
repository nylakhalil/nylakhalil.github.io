/**
 * From ReactGA Community Wiki Page https://github.com/react-ga/react-ga/wiki/React-Router-v4-withTracker
 */

import { useEffect } from "react";
import ReactGA from "react-ga";
import { GA_CODE } from "./config/AppConfig";

if (process.env.NODE_ENV === "production") {
  ReactGA.initialize(GA_CODE);
} else if (process.env.NODE_ENV === "test") {
  /* NylaKhalil - initialize, but set test mode: 
  https://github.com/react-ga/react-ga#test-mode */
  ReactGA.initialize(GA_CODE, { testMode: true });
} else {
  /* NylaKhalil - disable send in non-prod env: 
  https://developers.google.com/analytics/devguides/collection/analyticsjs/debugging */
  ReactGA.initialize(GA_CODE, { debug: false });
  var ga = ReactGA.ga();
  ga("set", "sendHitTask", null);
}

export const withTracker = (WrappedComponent, injectedProps) => {
  const trackPage = (page) => {
    ReactGA.set({ page, ...{} });
    ReactGA.pageview(page);
  };

  const HOC = (props) => {
    useEffect(
      () => trackPage(props.location.pathname),
      [props.location.pathname]
    );

    const newProps = { ...props, ...injectedProps };
    return <WrappedComponent {...newProps} />;
  };

  return HOC;
};
