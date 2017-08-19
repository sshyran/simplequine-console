/* 3rd party modules */
import { Layout, Spin } from 'antd';
import React from 'react';
import styled from 'styled-components';

const { Content } = Layout;

const StyledContent = styled(Content)`
  align-items: center;
  display: flex;
  height: calc(100vh - 64px);
  justify-content: center;
`;

const Placeholder = () => (
  <StyledContent>
    <Spin />
  </StyledContent>
);

export default Placeholder;
