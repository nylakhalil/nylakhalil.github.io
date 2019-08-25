/**
 * From ReactGA Community Wiki Page https://github.com/react-ga/react-ga/wiki/React-Router-v4-withTracker
 */

import React, { useEffect } from 'react';
import ReactGA from 'react-ga';

if (process.env.NODE_ENV === "production") {
    ReactGA.initialize('UA-140687992-1');
} else {
    /* NylaKhalil added - disable send in non-prod env: 
    https://developers.google.com/analytics/devguides/collection/analyticsjs/debugging */
    ReactGA.initialize('UA-140687992-1', { debug: false });
    var ga = ReactGA.ga();
    ga('set', 'sendHitTask', null); 
}

export const withTracker = (WrappedComponent, options = {}) => {
    
    const trackPage = page => {
        ReactGA.set({ page, ...options });
        ReactGA.pageview(page);
    };

    const HOC = props => {
        useEffect(() => trackPage(props.location.pathname), [
            props.location.pathname
        ]);

        return <WrappedComponent {...props} />;
    };

    return HOC;
};