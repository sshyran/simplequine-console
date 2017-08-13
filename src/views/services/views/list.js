/* 3rd party modules */
import { Col, Row, Layout, Card, Popconfirm, Button, Spin, notification } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

/* App modules */

const { Header, Content } = Layout;

const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message,
    description,
  });
};

class ServiceListView extends Component {
  deleteService = (serviceId) => {
    const { deleteServiceMutation, data } = this.props;

    deleteServiceMutation({ variables: { serviceId } })
      .then((response) => {
        console.log(response); // eslint-disable-line no-console
        openNotificationWithIcon('success', 'Success!', 'Changes have been saved.');
        data.refetch();
      }).catch((e) => {
        openNotificationWithIcon('error', 'Error!', 'Ooops... something went wrong! Please refresh the page and try again. If problems persists please get in touch with us'); // eslint-disable-line max-len
        console.error(e); // eslint-disable-line no-console
      });
  };

  render () {
    const { loading, error, services } = this.props.data;

    if (loading) {
      return (
        <div>
          <Header>
            <h4 style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.67)' }}>SERVICE LIST</h4>
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

    if (!services) {
      return (
        <Redirect to={'/'} />
      );
    }

    return (
      <div>
        <div>
          <Header style={{ display: 'flex' }}>
            <h4 style={{ flexGrow: '1', textAlign: 'center', color: 'rgba(255, 255, 255, 0.67)' }}>SERVICE LIST</h4>
            <Link to="/app/services/create">
              <Button style={{ alignSelf: 'center' }} type="primary" icon="plus">Add service</Button>
            </Link>
          </Header>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <Row gutter={16}>
              {services.map(service => (
                <Col key={service.id} xs={24} sm={12} md={8} style={{ marginBottom: '15px' }}>
                  <Card
                    title={service.name}
                    bordered={false}
                    extra={
                      <div>
                        <Popconfirm
                          onConfirm={() => this.deleteService(service.id)}
                          title="Are you sure?"
                          okText="Yes"
                          cancelText="No"
                        >
                          <span style={{ marginRight: '15px', color: '#f04134', cursor: 'pointer' }}>Delete</span>
                        </Popconfirm>
                        <Link to={`/app/services/edit/${service.id}`}>
                        Edit
                      </Link>
                      </div>
                    }
                  >
                    <p>{`Duration: ${service.duration} min`}</p>
                    <p>{`Price: ${service.price} ${service.currency}`}</p>
                    <p>{`Max participants: ${service.maxParticipants}`}</p>
                    <p>{`Description: ${service.description}`}</p>
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

ServiceListView.propTypes = {
  data: PropTypes.shape({
    services: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
    })),
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool,
    refetch: PropTypes.func.isRequired,
  }).isRequired,
  deleteServiceMutation: PropTypes.func.isRequired,
};

export default ServiceListView;
