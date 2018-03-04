import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Prompt } from "react-router-dom";

import Register from './components/register/register';

const Oui = () => {
  <div>
    Oui
  </div>
}
const Non = () => {
  <div>
    Non
  </div>
}
const None = () => {
  <div>
    None
  </div>
}

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Form</Link>
            </li>
            <li>
              <Link to="/one/sercan">One</Link>
            </li>
            <li>
              <Link to="/two">Two</Link>
            </li>
          </ul>
          <Route path="" render={() => <h3>default</h3>} />
          <Route path="/one/:name" component={Register} />
          <Route path="/two" render={() => <h3>Two</h3>} />
        </div>
      </Router>
    );
  }
}

export default App;
