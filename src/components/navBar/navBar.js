import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

class NavBar extends Component
{
  state = {
    current: 'logo',
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  render() {
    return (
      <Header style={{ position: 'fixed', width: '100%' }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">ENKO</Menu.Item>
          <Menu.Item key="2">Inscription</Menu.Item>
          <Menu.Item key="3">Connexion</Menu.Item>
        </Menu>
      </Header>
    );
  }
}


export default NavBar