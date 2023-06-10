import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter as Router} from 'react-router-dom';
import { Route } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';


import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap'
// import './test.scss'
import * as Sentry from "@sentry/react";

console.log(`process.env.REACT_APP_SENTRY_DSN_KEY: ${process.env.REACT_SENTRY_DSN_KEY}`);
console.log(`process.env.REACT_APP_MAPBOX_TOKEN: ${process.env.REACT_APP_MAPBOX_TOKEN}`);

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN_KEY,
  integrations: [
    new Sentry.BrowserTracing({
      // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ["localhost", "https://www.st-paul-baptist-church.com"],
    }),
  ],
  tracesSampleRate: 1.0,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <ParallaxProvider>    
      <App />
    </ParallaxProvider>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
