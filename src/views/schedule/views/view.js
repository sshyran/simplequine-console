/* 3rd party modules */
import { Calendar, Col, Row, Table, Layout } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

/* App modules */
import Event from '../components/event';
import { getAppointmentsForRendering } from '../services/calendar';
import { createTableData } from '../services/table';
import HeaderText from '../../../shared/components/headerText';
import Placeholder from '../../../shared/components/placeholder';

const { Header, Content } = Layout;

class ScheduleView extends Component {
  state = {
    selectedDate: moment(),
  };

  onDateChange = (selectedDate) => {
    this.setState({
      selectedDate,
    });
  };

  getTableData = () => {
    const appointmentList = getAppointmentsForRendering(this.state.selectedDate, this.props.data.appointments);

    return appointmentList.map(appointment => ({
      id: appointment.id,
      key: appointment.id,
      startsAt: moment(appointment.startsAt).format('HH:mm'),
      endsAt: moment(appointment.endsAt).format('HH:mm'),
      service: appointment.service.name,
      trainer: `${appointment.trainer.firstName} ${appointment.trainer.lastName}`,
      clientName: `${appointment.firstName} ${appointment.lastName}`,
      clientEmail: appointment.email,
      clientPhoneNumber: appointment.phoneNumber,
      appointmentGroup: appointment.appointmentGroup,
    }));
  };

  dateCellRender = (date) => {
    const appointmentList = getAppointmentsForRendering(date, this.props.data.appointments);

    return (
      <ul className="events">
        {
          appointmentList.map(appointment => (
            <li key={appointment.id}>
              <Event date={appointment.startsAt} description={appointment.service.name} />
            </li>
          ))
        }
      </ul>
    );
  };

  expandedRowRender = (record) => {
    const columns = [
      { title: 'Name', dataIndex: 'clientName', key: 'clientName' },
      { title: 'Email', dataIndex: 'clientEmail', key: 'clientEmail' },
      { title: 'Phone', dataIndex: 'clientPhoneNumber', key: 'clientPhoneNumber' },
    ];

    const tableData = createTableData(record);

    return (
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
      />
    );
  };

  render () {
    const { loading, error, isUserLoggedIn } = this.props.data;
    const { selectedDate } = this.state;

    const columns = [
      { title: 'Start', dataIndex: 'startsAt', key: 'startsAt' },
      { title: 'End', dataIndex: 'endsAt', key: 'endsAt' },
      { title: 'Service', dataIndex: 'service', key: 'service' },
      { title: 'Trainer', dataIndex: 'trainer', key: 'trainer' },
    ];

    if (loading) {
      return (
        <div>
          <Header>
            <HeaderText>SCHEDULE</HeaderText>
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

    if (!isUserLoggedIn) {
      return (
        <Redirect to={'/'} />
      );
    }

    return (
      <div>
        <Header>
          <HeaderText>SCHEDULE</HeaderText>
        </Header>
        <Content style={{ margin: '0 16px', overflow: 'initial' }}>
          <Row type="flex" align="center">
            <Col xs={24} >
              <Calendar
                value={selectedDate}
                onSelect={this.onDateChange}
                onPanelChange={this.onDateChange}
                dateCellRender={this.dateCellRender}
              />
            </Col>
          </Row>
          <Row type="flex" align="center">
            <Col xs={24} sm={16} md={12} >
              <Table
                columns={columns}
                pagination={false}
                expandedRowRender={this.expandedRowRender}
                dataSource={this.getTableData()}
              />
            </Col>
          </Row>
        </Content>
      </div>
    );
  }
}

ScheduleView.propTypes = {
  data: PropTypes.shape({
    appointments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
    })),
    loading: PropTypes.bool.isRequired,
    isUserLoggedIn: PropTypes.bool,
    error: PropTypes.shape(),
  }).isRequired,
};

export default ScheduleView;
