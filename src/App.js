import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Prompt } from "react-router-dom";

import 'antd/dist/antd.css';
import './App.css';

import { Layout, Menu, Breadcrumb } from 'antd';

import NavBar from './components/navBar/navBar';
import NoMatch from './components/noMatch/noMatch';

import RegisterStep1 from './components/register/register-step1';
import RegisterStep2 from './components/register/register-step2';
import RegisterStep3 from './components/register/register-step3';
import Login from './components/login/login';
import Logout from './components/logout/logout';
import AccountMe from './components/account.me/account.me';

const { Content } = Layout;


const None = () => {
  return (
    <div>ok</div>
  )
} 
class App extends Component {

  state = {
    user: {
      token: null
    }
  }

  constructor(props) {
    super(props);
    this.state.user.token = localStorage.getItem('user::token');
  }

  render() {
    return (
      <Router>
        <Layout>

          <NavBar />
          <Content style={{ padding: '0 50px' }}>
            <Route path="/" exact component={None} />
            <Route path="/register/step1" component={RegisterStep1} />
            <Route path="/register/step2" component={RegisterStep2} />
            <Route path="/register/step3" component={RegisterStep3} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/account/me" component={AccountMe} />
          </Content>

        </Layout>
      </Router>
    );
  }
}

export default App;
