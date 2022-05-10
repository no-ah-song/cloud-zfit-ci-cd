import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MobileLayout from './MobileLayout';
import DesktopLayout from './DesktopLayout';

const LayoutRoot = styled.div`
  &.mobile {
    display: block;
    @media only screen and (min-width: 800px) {
      display: none;
    }
  }
  &.desktop {
    display: none;
    @media only screen and (min-width: 800px) {
      display: block;
    }
  }
`;

const Layout = ({ children }) => {
  return (
    <>
      <LayoutRoot className="mobile">
        <MobileLayout>{children}</MobileLayout>
      </LayoutRoot>
      <LayoutRoot className="desktop">
        <DesktopLayout>{children}</DesktopLayout>
      </LayoutRoot>
    </>
  );
};

Layout.propTypes = {};

export default React.memo(Layout);
