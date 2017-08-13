/* 3rd party modules */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Row, Layout } from 'antd';

const { Header, Content } = Layout;

const Menu = () => (
  <div>
    <Header>
      <h4 style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.67)' }}>MENU</h4>
    </Header>
    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
      <Row className="full-height-width" type="flex" justify="center" align="center" style={{ flexFlow: 'column' }}>
        <Col span={24} style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
          <Link to="/app/schedule">
            <Button type="primary" size="large">Schedule</Button>
          </Link>
        </Col>
        <Col span={24} style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
          <Link to="/app/services">
            <Button type="primary" size="large">Services</Button>
          </Link>
        </Col>
        <Col span={24} style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
          <Link to="/app/trainers">
            <Button type="primary" size="large">Trainers</Button>
          </Link>
        </Col>
      </Row>
    </Content>
  </div>
);

export default Menu;
