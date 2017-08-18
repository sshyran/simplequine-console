/* 3rd party modules */
import { pipe, merge, ifElse } from 'ramda';

export const wrapContentInArray = arg => [arg];

export const isPartOfGroupAppointment = appointment => Boolean(appointment.appointmentGroup);

export const getGroupAppointment = appointment => appointment.appointmentGroup;

export const getAppointmentsOfOneGroup = groupAppointment => groupAppointment.appointments;

export const getRelatedAppointments = appointment => pipe(getGroupAppointment, getAppointmentsOfOneGroup)(appointment);

export const extractPersonalInfo = appointment => (
  {
    clientName: `${appointment.firstName} ${appointment.lastName}`,
    clientEmail: appointment.email,
    clientPhoneNumber: appointment.phoneNumber,
  }
);

export const createRowData = appointment => merge(extractPersonalInfo(appointment), { key: appointment.id });

export const createRowDataForOneAppointment = appointment => pipe(createRowData, wrapContentInArray)(appointment);

export const createRowDataForRelatedAppointments = appointment => (
  getRelatedAppointments(appointment).map(item => createRowData(item))
);

export const createTableData = appointment => ifElse(
  isPartOfGroupAppointment,
  createRowDataForRelatedAppointments,
  createRowDataForOneAppointment,
)(appointment);
