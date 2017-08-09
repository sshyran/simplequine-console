import React from 'react';
import PropTypes from 'prop-types';

const TrainerBio = props => (
  <div>
    <p>{`Email: ${props.email}`}</p>
    <p>{`Phone: ${props.phoneNumber}`}</p>
    <p>{`Working days: ${props.workingDays}`}</p>
    <p>{`Working hours:
      ${props.startsAt} -
      ${props.endsAt}`}
    </p>
  </div>
);

TrainerBio.propTypes = {
  email: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  workingDays: PropTypes.string.isRequired,
  startsAt: PropTypes.string.isRequired,
  endsAt: PropTypes.string.isRequired,
};

export default TrainerBio;
