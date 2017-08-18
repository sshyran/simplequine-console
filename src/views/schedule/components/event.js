/* 3rd party modules */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

/* App modules */
import { Dot } from './eventStyled';

const Event = ({ date, description }) => (
  <div>
    <Dot>●</Dot>
    <span>
      {`${moment(date).format('HH:mm')} - ${description}`}
    </span>
  </div>
);

Event.propTypes = {
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default Event;
