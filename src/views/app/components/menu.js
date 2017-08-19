/* 3rd party modules */
import { Button, Col, Row, Layout } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

/* App modules */
import HeaderText from '../../../shared/components/headerText';

const { Header, Content } = Layout;

const Menu = () => (
  <div>
    <Header>
      <HeaderText>MENU</HeaderText>
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
