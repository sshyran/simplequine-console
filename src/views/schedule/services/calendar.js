/* 3rd party modules */
import moment from 'moment';
import { equals, uniqWith, pipe } from 'ramda';

/* App modules */
import { isArrayEmpty } from '../../../shared/services/utils';

export const getStartOfDay = date => moment(date).startOf('day');

export const getEndOfDay = date => moment(date).endOf('day');

export const getAppointmentsOfGivenDay = (date, appointments) => (
  appointments.filter(appointment => moment(appointment.startsAt).isBetween(getStartOfDay(date), getEndOfDay(date)))
);

export const areAppointmentsRelated = (arg1, arg2) => equals(arg1.appointmentGroup.id, arg2.appointmentGroup.id);

// To show one event per group on calendar we need to create a new list
// where each group contains only one appointment
export const removeDuplicates = (appointments) => {
  if (isArrayEmpty(appointments)) { return []; }

  // All private appointments should be kept
  const privateAppointments = appointments.filter(appointment => !appointment.appointmentGroup);

  const groupAppointments = appointments.filter(appointment => appointment.appointmentGroup);

  // If compared appointments are related, uniqWith will take only the first one
  const uniqueGroupAppointments = uniqWith(areAppointmentsRelated)(groupAppointments);

  return [].concat(privateAppointments, uniqueGroupAppointments);
};

export const sortAscAppointmentsByStartingDate = appointments =>
  appointments
    .sort((a, b) => moment(b.startsAt).unix() - moment(a.startsAt).unix())
    .reverse()
;

export const getAppointmentsForRendering = (date, appointments) => (
  pipe(getAppointmentsOfGivenDay, removeDuplicates, sortAscAppointmentsByStartingDate)(date, appointments)
);
