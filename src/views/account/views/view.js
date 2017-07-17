// 3rd party modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Col, Row, Layout, Spin, notification } from 'antd';

// App modules
import EmailForm from '../components/emailForm';

const { Header, Content } = Layout;

const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message,
    description,
  });
};

class CreateTrainerView extends Component {
  updateUser = ({ email, name }) => {
    const { updateUserMutation, history, data } = this.props;

    const variables = {
      email,
      name,
      userId: data.user.id,
    };

    updateUserMutation({ variables })
      .then((response) => {
        console.log(response); // eslint-disable-line no-console
        openNotificationWithIcon('success', 'Success!', 'Changes have been saved.');
      }).catch((e) => {
        console.error(e); // eslint-disable-line no-console
        openNotificationWithIcon('error', 'Error!', 'Ooops... something went wrong! Please refresh the page and try again. If problems persists please get in touch with us'); // eslint-disable-line max-len
        history.push('/');
      });
  };

  render () {
    const { loading, error, user } = this.props.data;

    if (loading) {
      return (
        <div>
          <Header>
            <h4 style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.67)' }}>ACCOUNT</h4>
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
          <h4 style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.67)' }}>ACCOUNT</h4>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <Row type="flex" justify="center" align="center" style={{ flexFlow: 'column' }}>
            <Col xs={22} sm={16} md={10} style={{ margin: '0 auto 40px auto' }}>
              <h3 style={{ textAlign: 'center' }}>URL of your booking page:</h3>
              <a
                style={{
                  display: 'block',
                  textAlign: 'center',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
                href={`https://book.horsebitmedia.com/${user.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {`https://book.horsebitmedia.com/${user.id}`}
              </a>
            </Col>
            <Col xs={22} sm={16} md={10} style={{ margin: '0 auto 20px auto' }}>
              <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Update your account :</h3>
              <EmailForm onSubmit={this.updateUser} user={{ email: user.email, name: user.name }} />
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
  updateUserMutation: PropTypes.func.isRequired,
};

export default CreateTrainerView;
