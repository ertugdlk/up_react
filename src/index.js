/* ------------------------------ Main Imports ------------------------------ */
import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
/* -------------------------------------------------------------------------- */

/* ------------------------------- App Imports ------------------------------ */
import Dashboard from './pages/Dashboard';
import Homepage from './pages/Homepage';
import reducers from './reducers/index';
import 'semantic-ui-css/semantic.min.css';
import './components/css/index.css';
/* -------------------------------------------------------------------------- */

/* -- Creates a store for data. Applys middleware thunk for async fonctions - */
const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/' exact component={() => <Homepage />} />
        <Route path='/dashboard' exact component={() => <Dashboard />} />
        <Route
          path='/dashboard/:steam'
          exact
          component={(props) => <Dashboard {...props.match.params} />}
        />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
