import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import { BrowserRouter as Router,
  Switch ,
  Route} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Homepage from './pages/Homepage'


ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" exact component={ () => <Homepage/>} />
      <Route path="/dashboard" exact component= { () => <Dashboard/>} />
    </Switch>
  </Router>,
  document.getElementById('root')
);