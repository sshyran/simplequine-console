/* 3rd party modules */
import { Col, Row, Layout } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

/* App modules */
import TrainerForm from '../components/form';
import HeaderText from '../../../shared/components/headerText';
import Placeholder from '../../../shared/components/placeholder';

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
            <HeaderText>
              CREATE TRAINER
            </HeaderText>
          </Header>
          <Placeholder />
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
          <HeaderText>
            CREATE TRAINER
          </HeaderText>
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
