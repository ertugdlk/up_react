import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
import { BrowserRouter as Router,
  Switch ,
  Route} from "react-router-dom";
import Dashboard from './components/Dashboard';


ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/dashboard" exact component= {Dashboard} />
    </Switch>
  </Router>,
  document.getElementById('root')
);