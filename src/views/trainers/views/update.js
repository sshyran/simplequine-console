/* 3rd party modules */
import { Col, Row, Layout, Spin } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

/* App modules */
import TrainerForm from '../components/form';
import HeaderText from '../../../shared/components/headerText';

const { Header, Content } = Layout;

class UpdateTrainerView extends Component {
  updateTrainer = ({ firstName, lastName, phoneNumber, email, startsAt, endsAt, workingDays }) => {
    const { updateTrainerMutation, history, match } = this.props;

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
      schedules: [scheduleVariables],
      trainerId: match.params.trainerId,
    };

    updateTrainerMutation({ variables })
      .then((response) => {
        console.log(response); // eslint-disable-line no-console
        history.push('/app/trainers/list');
      }).catch((e) => {
        console.error(e); // eslint-disable-line no-console
        history.push('/');
      });
  };

  render () {
    const { loading, error, trainer } = this.props.data;

    if (loading) {
      return (
        <div>
          <Header>
            <HeaderText>
              UPDATE TRAINER
            </HeaderText>
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

    if (!trainer) {
      return (
        <Redirect to={'/'} />
      );
    }

    return (

      <div>
        <Header>
          <HeaderText>
            UPDATE TRAINER
          </HeaderText>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <Row type="flex" justify="center" align="center" style={{ flexFlow: 'column' }}>
            <Col span={24} style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
              <TrainerForm onSubmit={this.updateTrainer} trainer={trainer} />
            </Col>
          </Row>
        </Content>
      </div>
    );
  }
}

UpdateTrainerView.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      trainerId: PropTypes.string.isRequired,
    }),
  }).isRequired,
  data: PropTypes.shape({
    trainer: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
    loading: PropTypes.bool.isRequired,
    error: PropTypes.shape(),
  }).isRequired,
  updateTrainerMutation: PropTypes.func.isRequired,
};

export default UpdateTrainerView;
