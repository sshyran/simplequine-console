/* 3rd party modules */
import { Col, Row, Layout, Button, Spin } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

/* App modules */
import TrainerBio from '../components/bio';
import TrainerCard from '../components/card';
import { getStartOfToday } from '../services/time';
import FlexItem from '../../../shared/components/flexItem';
import HeaderText from '../../../shared/components/headerText';

const { Header, Content } = Layout;

class TrainerListView extends Component {
  deleteTrainer = (trainerId) => {
    const { deleteTrainerMutation, data } = this.props;

    deleteTrainerMutation({ variables: { trainerId } })
      .then((response) => {
        console.log(response); // eslint-disable-line no-console
        data.refetch();
      }).catch((e) => {
        console.error(e); // eslint-disable-line no-console
      });
  };

  prettifyWorkingDay = workingDays => (
    []
      .concat(workingDays)
      .sort((a, b) => a - b)
      .map(workingDay => moment().isoWeekday(workingDay).format('ddd'))
      .join(', ')
  );

  render () {
    const { loading, error, trainers } = this.props.data;

    if (loading) {
      return (
        <div>
          <Header>
            <FlexItem grow={1}>
              <HeaderText>
                TRAINER LIST
              </HeaderText>
            </FlexItem>
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

    if (!trainers) {
      return (
        <Redirect to={'/'} />
      );
    }

    return (
      <div>
        <Header style={{ display: 'flex' }}>
          <FlexItem grow={1}>
            <HeaderText>
                TRAINER LIST
              </HeaderText>
          </FlexItem>
          <Link to="/app/trainers/create">
            <Button style={{ alignSelf: 'center' }} type="primary" icon="plus">Add trainer</Button>
          </Link>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <Row gutter={16}>
            {trainers.map(trainer => (
              <Col key={trainer.id} xs={24} sm={12} md={8} style={{ marginBottom: '15px' }}>
                <TrainerCard
                  actionHandler={() => this.deleteTrainer(trainer.id)}
                  linkAddress={`/app/trainers/edit/${trainer.id}`}
                  title={`${trainer.firstName} ${trainer.lastName}`}
                >
                  <TrainerBio
                    email={trainer.email}
                    phoneNumber={trainer.phoneNumber}
                    workingDays={this.prettifyWorkingDay(trainer.schedules[0].workingDays)}
                    startsAt={getStartOfToday().add(trainer.schedules[0].startsAt, 'minutes').format('HH:mm')}
                    endsAt={getStartOfToday().add(trainer.schedules[0].endsAt, 'minutes').format('HH:mm')}
                  />
                </TrainerCard>
              </Col>
              ))}
          </Row>
        </Content>
      </div>
    );
  }
}

TrainerListView.propTypes = {
  data: PropTypes.shape({
    trainers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
    })),
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool,
    refetch: PropTypes.func.isRequired,
  }).isRequired,
  deleteTrainerMutation: PropTypes.func.isRequired,
};

export default TrainerListView;
