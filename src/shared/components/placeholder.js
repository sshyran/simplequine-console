/* 3rd party modules */
import { Layout, Spin } from 'antd';
import React from 'react';
import styled from 'styled-components';

const { Content } = Layout;

const StyledContent = styled(Content)`
  alignItems: 'center';
  display: 'flex';
  height: 'calc(100vh - 64px)';
  justifyContent: 'center';
`;

const Placeholder = () => (
  <StyledContent>
    <Spin />
  </StyledContent>
);

export default Placeholder;
