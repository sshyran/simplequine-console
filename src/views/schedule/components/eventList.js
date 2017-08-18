/* 3rd party modules */
import React from 'react';
import PropTypes from 'prop-types';

/* App modules */
import Event from './event';
import { List, ListItem } from './eventListStyled';

const EventList = ({ appointments }) => (
  <List>
    {
      appointments.map(appointment => (
        <ListItem key={appointment.id}>
          <Event date={appointment.startsAt} description={appointment.service.name} />
        </ListItem>
      ))
    }
  </List>
);

EventList.propTypes = {
  appointments: PropTypes.shape({
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    startsAt: PropTypes.string.isRequired,
  }).isRequired,
};
