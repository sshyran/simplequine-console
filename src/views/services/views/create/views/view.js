// 3rd party modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Col, Row, Layout, Spin, notification } from 'antd';

// App modules
import ServiceForm from '../components/serviceForm';

const { Header, Content } = Layout;

const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message,
    description,
  });
};

class CreateServiceView extends Component {
  createService = ({ currency, description, duration, maxParticipants, name, price }) => {
    const { createServiceMutation, history, data } = this.props;

    const variables = {
      userId: data.user.id,
      currency,
      description,
      duration,
      maxParticipants,
      name,
      price,
    };

    createServiceMutation({ variables })
      .then((response) => {
        console.log(response); // eslint-disable-line no-console
        openNotificationWithIcon('success', 'Success!', 'Changes have been saved.');
        history.push('/app/services/list');
      }).catch((e) => {
        console.error(e); // eslint-disable-line no-console
        openNotificationWithIcon('error', 'Error!', 'Ooops... something went wrong! Please refresh the page and try again. If problems persists please get in touch with us'); // eslint-disable-line max-len
      });
  };

  render () {
    const { loading, error, user } = this.props.data;

    if (loading) {
      return (
        <div>
          <Header>
            <h4 style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.67)' }}>CREATE SERVICE</h4>
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
          <h4 style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.67)' }}>CREATE SERVICE</h4>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <Row type="flex" justify="center" align="center" style={{ flexFlow: 'column' }}>
            <Col span={24} style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
              <ServiceForm onSubmit={this.createService} />
            </Col>
          </Row>
        </Content>
      </div>
    );
  }
}

CreateServiceView.propTypes = {
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
  createServiceMutation: PropTypes.func.isRequired,
};

export default CreateServiceView;
