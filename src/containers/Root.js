// This component handles the App template used on every page.
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-115026786-1'); //Unique Google Analytics tracking number

function gaTrackPageView() {
  ReactGA.pageview(window.location.hash);
}

const Root = ({ store, history, routes, render }) => (
  <Provider store={store}>
    <Router history={history} routes={routes} render={render} onUpdate={gaTrackPageView} />
  </Provider>
);

const { object, func } = PropTypes;

Root.propTypes = {
  store: object.isRequired,
  history: object.isRequired,
  routes: object.isRequired,
  render: func.isRequired
};

export default Root;
