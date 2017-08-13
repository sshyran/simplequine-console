/* 3rd party modules */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Icon, Layout, Menu } from 'antd';
import { removeStorageItem } from '../../../shared/services/localStorage';

const { Sider } = Layout;

class SiderWrapper extends Component {
  state = {
    collapsed: false,
    mode: 'inline',
  };

  onCollapse = (collapsed) => {
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  };

  getActiveLink = () => {
    const path = this.props.location.pathname;

    if (path.startsWith('/app/schedule')) {
      return ['1'];
    } else if (path.startsWith('/app/services')) {
      return ['2'];
    } else if (path.startsWith('/app/trainers')) {
      return ['3'];
    }

    return [];
  };

  handleClick = ({ key }) => {
    if (key === 'logout') {
      removeStorageItem('auth0AccessToken');
      removeStorageItem('auth0IdToken');
      removeStorageItem('auth0ExpiresAt');
      window.location.reload();
    }
  };

  render () {
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        breakpoint="md"
        collapsedWidth="64"
        style={{ overflow: 'auto' }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode={this.state.mode}
          defaultSelectedKeys={this.getActiveLink()}
          onClick={this.handleClick}
        >
          <Menu.Item key="1">
            <Link to="/app/schedule">
              <span>
                <Icon type="calendar" />
                <span className="nav-text">Schedule</span>
              </span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/app/services">
              <span>
                <Icon type="credit-card" />
                <span className="nav-text">Services</span>
              </span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/app/trainers/list">
              <span>
                <Icon type="team" />
                <span className="nav-text">Trainers</span>
              </span>
            </Link>
          </Menu.Item>
          <Menu.Item key="account">
            <Link to="/app/account">
              <span>
                <Icon type="setting" />
                <span className="nav-text">Account</span>
              </span>
            </Link>
          </Menu.Item>
          <Menu.Item key="logout">
            <span>
              <Icon type="logout" />
              <span className="nav-text">Log out</span>
            </span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

SiderWrapper.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

SiderWrapper.__ANT_LAYOUT_SIDER = true; // eslint-disable-line
export default withRouter(SiderWrapper);
