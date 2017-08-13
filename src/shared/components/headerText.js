/* 3rd party modules */
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const HeaderTextStyled = styled('h4')`
  color: rgba(255, 255, 255, 0.67);
  text-align: center;
`;

const HeaderText = ({ children }) => (
  <HeaderTextStyled>{children}</HeaderTextStyled>
);

HeaderText.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node.isRequired,
  ]).isRequired,
};

export default HeaderText;
