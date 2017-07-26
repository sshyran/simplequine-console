// 3rd party modules
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { Layout } from 'antd';

// App modules
import MainMenu from '../components/menu';
import TrainerFormView from '../../trainers/views/view';
import ServiceFormView from '../../services/views/view';
import ScheduleContainer from '../../schedule/views/container';
import AccountContainer from '../../account/views/container';
import SiderWrapper from '../components/siderWrapper';

import './view.css';

const AppView = (props) => {
  if (props.data.loading) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SiderWrapper />
        <Layout />
      </Layout>
    );
  }

  if (!props.data.user) {
    return (
      <Redirect to="/" />
    );
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SiderWrapper />
      <Layout>
        <Route exact path={`${props.match.url}`} component={MainMenu} />
        <Route path={`${props.match.url}/trainers`} component={TrainerFormView} />
        <Route path={`${props.match.url}/services`} component={ServiceFormView} />
        <Route path={`${props.match.url}/schedule`} component={ScheduleContainer} />
        <Route path={`${props.match.url}/account`} component={AccountContainer} />
      </Layout>
    </Layout>
  );
};

AppView.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    user: PropTypes.shape(),
    loading: PropTypes.bool.isRequired,
  }).isRequired,
};

export default AppView;