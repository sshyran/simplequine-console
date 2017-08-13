/* 3rd party modules */
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const FlexItemStyled = styled('div')`
  align-self: ${props => props.align || 'auto'};
  flex-basis: ${props => props.basis || 'auto'};
  flex-grow: ${props => props.grow || 0};
  flex-shrink: ${props => props.shrink || 1};
  order: ${props => props.order || 0};
`;

const FlexItem = props => (
  <FlexItemStyled {...props} >{props.children}</FlexItemStyled>
);

FlexItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node.isRequired,
  ]).isRequired,
};

export default FlexItem;
