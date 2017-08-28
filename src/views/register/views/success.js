/* eslint-disable */

/* 3rd party modules */
import { Col, Row, Layout, Button } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

/* App modules */
import HeaderText from '../../../shared/components/headerText';
import Placeholder from '../../../shared/components/placeholder';

const { Header, Content } = Layout;

class SuccessView extends Component {
  render () {
    const { loading, error, user } = this.props.data;

    if (loading) {
      return (
        <div>
          <Header>
            <HeaderText>ACCOUNT</HeaderText>
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
          <HeaderText>Congratulations!</HeaderText>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <Row type="flex" justify="center" align="center" style={{ flexFlow: 'column' }}>
            <Col xs={22} sm={16} md={10} style={{ margin: '0 auto 40px auto' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>You have successfully created an account in Bookly!</h3>
              <p style={{ marginBottom: '20px' }}>From this moment, your clients can book rides via this address:</p>
              <a
                style={{
                  display: 'block',
                  marginBottom: '20px',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
                href={`https://book.${window.location.host}/${user.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {`https://book.${window.location.host}/${user.id}`}
              </a>
              <p style={{ marginBottom: '20px' }}>You can always find your booking address in Account section of the app.</p>
              <p style={{ marginBottom: '20px' }}>
                Place a link to this address on your website to let your clients know that you accept online bookings!
              </p>
              <p style={{ marginBottom: '20px' }}>
                Feel free to give us a feedback about our app - hello@horsebitmedia.com
              </p>
              <Link to={'/app/schedule'}>
                <Button type="primary">Go to app</Button>
              </Link>
            </Col>
          </Row>
        </Content>
      </div>
    );
  }
}

SuccessView.propTypes = {
  data: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool,
  }).isRequired,
};

export default SuccessView;
