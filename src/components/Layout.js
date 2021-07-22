import React from 'react';
import { Container } from '@components';
import { colorDefaultBackground } from '@colors';

const Layout = ({ children, bgColor }) => {
  return <Container bgColor={bgColor}>{children}</Container>;
};

Layout.defaultProps = {
  bgColor: colorDefaultBackground,
};

export default Layout;
