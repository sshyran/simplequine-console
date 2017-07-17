// 3rd party modules
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Layout } from 'antd';

import LoginButton from '../components/loginButton';

const { Header, Content } = Layout;

const HomeView = ({ data }) => {
  if (data.loading) {
    return (
      <span>Loading!</span>
    );
  }

  if (data.error) {
    return (
      <span>Error!</span>
    );
  }

  return (
    <div>
      <Layout>
        <Header>
          <h4 style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.67)' }}>BOOKING APP</h4>
        </Header>
        <Content
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 64px)' }}
        >
          {data.user ? (
            <Link to={'/app/schedule'}>
              <Button>Go to app</Button>
            </Link>
          ) : (
            <div>
              <LoginButton initialScreen={'login'} label={'Login'} />
              <LoginButton initialScreen={'signUp'} label={'Register'} />
            </div>
          )}
        </Content>
      </Layout>
    </div>
  );
};

HomeView.propTypes = {
  data: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default HomeView;
