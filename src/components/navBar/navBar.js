import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Prompt } from "react-router-dom";

import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

class NavBar extends Component {

  state = {
    current: 'logo'
  }

  constructor(props) {
    super(props);
  }

  isUserLogged() {
    let token = localStorage.getItem('user::token');
    return token !== null; 
  }

  render() {
    if(this.isUserLogged()) {
      return (
        <Header style={{ width: '100%' }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">
              <Link to="/">ENKO</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/account/me">Mon profil</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/logout">Déconnexion</Link>
            </Menu.Item>
          </Menu>
        </Header>
      );
    } else {
      return (
        <Header style={{ width: '100%' }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">
              <Link to="/">ENKO</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/register/step1">Inscription</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/login">Connexion</Link>
            </Menu.Item>
          </Menu>
        </Header>
      );
    }
  }
}


export default NavBar