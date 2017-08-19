/* 3rd party modules */
import { Col, Row, Layout, notification } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

/* App modules */
import ServiceForm from '../components/form';
import HeaderText from '../../../shared/components/headerText';
import Placeholder from '../../../shared/components/placeholder';

const { Header, Content } = Layout;

const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message,
    description,
  });
};

class UpdateServiceView extends Component {
  updateService = ({ currency, description, duration, maxParticipants, name, price }) => {
    const { updateServiceMutation, history, data } = this.props;

    const variables = {
      serviceId: data.service.id,
      currency,
      description,
      duration,
      maxParticipants,
      name,
      price,
    };

    updateServiceMutation({ variables })
      .then((response) => {
        data.refetch();
        console.log(response); // eslint-disable-line no-console
        openNotificationWithIcon('success', 'Success!', 'Changes have been saved.');
        history.push('/app/services/list');
      }).catch((e) => {
        console.error(e); // eslint-disable-line no-console
        openNotificationWithIcon('error', 'Error!', 'Ooops... something went wrong! Please refresh the page and try again. If problems persists please get in touch with us'); // eslint-disable-line max-len
      });
  };

  render () {
    const { loading, error, service } = this.props.data;

    if (loading) {
      return (
        <div>
          <Header>
            <HeaderText>UPDATE SERVICE</HeaderText>
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

    if (!service) {
      return (
        <Redirect to={'/'} />
      );
    }

    return (

      <div>
        <Header>
          <HeaderText>UPDATE SERVICE</HeaderText>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <Row type="flex" justify="center" align="center" style={{ flexFlow: 'column' }}>
            <Col span={24} style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
              <ServiceForm onSubmit={this.updateService} service={service} />
            </Col>
          </Row>
        </Content>
      </div>
    );
  }
}

UpdateServiceView.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    service: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
    loading: PropTypes.bool.isRequired,
    error: PropTypes.shape(),
  }).isRequired,
  updateServiceMutation: PropTypes.func.isRequired,
};

export default UpdateServiceView;
