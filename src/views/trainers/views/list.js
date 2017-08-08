// 3rd party modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Col, Row, Layout, Card, Popconfirm, Button, Spin } from 'antd';
import moment from 'moment';

// App modules
import HeaderText from '../../../shared/components/headerText';
import FlexItem from '../../../shared/components/flexItem';

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
                  <Card
                    title={`${trainer.firstName} ${trainer.lastName}`}
                    bordered={false}
                    extra={
                      <div>
                        <Popconfirm
                          onConfirm={() => this.deleteTrainer(trainer.id)}
                          title="Are you sure?"
                          okText="Yes"
                          cancelText="No"
                        >
                          <span style={{ marginRight: '15px', color: '#f04134', cursor: 'pointer' }}>Delete</span>
                        </Popconfirm>
                        <Link to={`/app/trainers/edit/${trainer.id}`}>
                        Edit
                      </Link>
                      </div>
                    }
                  >
                    <p>{`Email: ${trainer.email}`}</p>
                    <p>{`Phone: ${trainer.phoneNumber}`}</p>
                    <p>{`Working days: ${this.prettifyWorkingDay(trainer.schedules[0].workingDays)}`}</p>
                    <p>{`Working hours:
                      ${moment().startOf('day').add(trainer.schedules[0].startsAt, 'minutes').format('HH:mm')} -
                      ${moment().startOf('day').add(trainer.schedules[0].endsAt, 'minutes').format('HH:mm')}`}
                    </p>
                  </Card>
                </Col>
              ))}
            </Row>
          </Content>
        </div>
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
