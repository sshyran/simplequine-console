/* 3rd party modules */
import moment from 'moment';

export const getStartOfGivenDay = date => moment(date).startOf('day');

export const getStartOfToday = () => getStartOfGivenDay(moment());
