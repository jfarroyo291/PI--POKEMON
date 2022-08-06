import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './views/Landing/Landing.jsx';
import Home from './views/Home/Home.jsx';
import Create from './views/Create/Create';
import Details from './views/Details/Details.jsx';
import NotFound from './views/NotFound/NotFound.jsx';

function App() {
  return (
    <Router>
      <Switch>
          <Route exact path = "/" component = { Landing } />
          <Route path = "/home" component = { Home } />
          <Route path = "/create" component = { Create } />
          <Route path = "/pokemon/:id" component = { Details } />
          <Route path = "*" component = { NotFound } />
          {/* <Route path = "/create/*" component = { NotFound } /> */}
        </Switch>
    </Router>
  );
}

export default App;
