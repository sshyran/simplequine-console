// 3rd party modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Calendar, Col, Row, Spin, Table, Layout } from 'antd';
import moment from 'moment';

// App modules
import './view.css';

const { Header, Content } = Layout;

class ScheduleView extends Component {
  state = {
    selectedDate: moment(),
  };

  onSelect = (selectedDate) => {
    this.setState({
      selectedDate,
    });
  };

  onPanelChange = (selectedDate) => {
    this.setState({ selectedDate });
  };

  getAppointmentsOfGivenDay = (date) => {
    const startOfDay = moment(date).startOf('day');
    const endOfDay = moment(date).endOf('day');
    const appointments = this.props.data.appointments;

    return appointments.filter(appointment => moment(appointment.startsAt).isBetween(startOfDay, endOfDay));
  };

  getTableData = () => {
    const appointmentList = this.sortByStartingDate(this.removeDuplicateAppointments(this.getAppointmentsOfGivenDay(this.state.selectedDate)));
    return appointmentList.map(appointment => ({
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

  removeDuplicateAppointments = (appointments) => {
    if (appointments.length > 1) {
      // Appointments which allow only 1 participant
      const privateAppointments = appointments.filter(appointment => !appointment.appointmentGroup);
      // Appointments which allow multiple participants
      const groupAppointments = appointments.filter(appointment => appointment.appointmentGroup);
      // Unique IDs of groupAppointments
      const groupIds = groupAppointments
        .map(appointment => appointment.appointmentGroup.id)
        .reduce((x, y) => x.includes(y) ? x : [...x, y], []); // eslint-disable-line no-confusing-arrow
      // Filtered group appointments
      const filteredGroupAppointments = groupIds
        .map(groupId => groupAppointments.find(appointment => appointment.appointmentGroup.id === groupId));
      return [].concat(privateAppointments, filteredGroupAppointments);
    }

    return [];
  };

  sortByStartingDate = appointments => appointments
    .sort((a, b) => moment(b.startsAt).unix() - moment(a.startsAt).unix())
    .reverse();

  dateCellRender = (date) => {
    const appointmentList = this.sortByStartingDate(this.removeDuplicateAppointments(this.getAppointmentsOfGivenDay(date)));
    return (
      <ul className="events">
        {
          appointmentList.map(appointment => (
            <li key={appointment.id}>
              <span className="event-normal">●</span>
              {`${moment(appointment.startsAt).format('HH:mm')} - ${appointment.service.name}`}
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

    let data = [];
    if (record.appointmentGroup) {
      data = record.appointmentGroup.appointments.map(appointment => ({
        key: appointment.id,
        clientName: `${appointment.firstName} ${appointment.lastName}`,
        clientEmail: appointment.email,
        clientPhoneNumber: appointment.phoneNumber,
      }));
    } else {
      data = [{
        key: record.key,
        clientName: record.clientName,
        clientEmail: record.clientEmail,
        clientPhoneNumber: record.clientPhoneNumber,
      }];
    }

    return (
      <Table
        columns={columns}
        dataSource={data}
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
            <h4 style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.67)' }}>SCHEDULE</h4>
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

    if (!isUserLoggedIn) {
      return (
        <Redirect to={'/app'} />
      );
    }

    return (
      <div>
        <Header>
          <h4 style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.67)' }}>SCHEDULE</h4>
        </Header>
        <Content style={{ margin: '0 16px', overflow: 'initial' }}>
          <Row type="flex" align="center">
            <Col xs={24} >
              <Calendar
                value={selectedDate}
                onSelect={this.onSelect}
                onPanelChange={this.onPanelChange}
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
