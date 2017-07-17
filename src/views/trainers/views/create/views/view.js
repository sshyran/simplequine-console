// 3rd party modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Col, Row, Layout, Spin } from 'antd';

// App modules
import TrainerForm from '../components/trainerForm';

const { Header, Content } = Layout;

class CreateTrainerView extends Component {
  createTrainer = ({ firstName, lastName, phoneNumber, email, startsAt, endsAt, workingDays }) => {
    const { createTrainerMutation, history, data } = this.props;

    const scheduleVariables = {
      startsAt: (startsAt.hour() * 60) + startsAt.minute(),
      endsAt: (endsAt.hour() * 60) + endsAt.minute(),
      workingDays,
    };

    const variables = {
      firstName,
      lastName,
      phoneNumber,
      email,
      userId: data.user.id,
      schedules: [scheduleVariables],
    };

    createTrainerMutation({ variables })
      .then((response) => {
        console.log(response); // eslint-disable-line no-console
        history.push('/app/trainers/list');
      }).catch((e) => {
        console.error(e); // eslint-disable-line no-console
        history.push('/');
      });
  };

  render () {
    const { loading, error, user } = this.props.data;

    if (loading) {
      return (
        <div>
          <Header>
            <h4 style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.67)' }}>CREATE TRAINER</h4>
          </Header>
          <Content
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 64px)' }}
          >
            <Spin />
          </Content>
        </div>
      );
    }

    if (error) {
      return (
        <span>Error!</span>
      );
    }

    if (!user) {
      return (
        <Redirect to={'/'} />
      );
    }

    return (
      <div>
        <Header>
          <h4 style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.67)' }}>CREATE TRAINER</h4>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <Row type="flex" justify="center" align="center" style={{ flexFlow: 'column' }}>
            <Col span={24} style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
              <TrainerForm onSubmit={this.createTrainer} />
            </Col>
          </Row>
        </Content>
      </div>
    );
  }
}

CreateTrainerView.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool,
  }).isRequired,
  createTrainerMutation: PropTypes.func.isRequired,
};

export default CreateTrainerView;
