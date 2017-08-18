/* 3rd party modules */
import { Layout } from 'antd';
import * as moment from 'moment-timezone';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

/* App modules */
import MainMenu from '../components/menu';
import SiderWrapper from '../components/siderWrapper';
import AccountContainer from '../../account/containers/container';
import ScheduleContainer from '../../schedule/containers/container';
import ServiceFormView from '../../services/index';
import TrainerFormView from '../../trainers/index';

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

  moment.tz.setDefault(props.data.user.timeZoneName);

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
