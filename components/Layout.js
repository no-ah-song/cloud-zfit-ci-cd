import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MobileLayout from './MobileLayout';
import DesktopLayout from './DesktopLayout';

const LayoutRoot = styled.div`
  &.mobile {
    display: block;
  }
  &.desktop {
    display: block;
  }
`;

const Layout = ({ children }) => {
  const [deviceType, setDeviceType] = useState();
  useEffect(() => {
    var width = document.body.clientWidth;
    if (width <= 800) {
      setDeviceType('mobile');
    } else {
      setDeviceType('desktop');
    }
  }, []);

  return (
    <>
      {deviceType === 'mobile' && (
        <LayoutRoot className="mobile">
          <MobileLayout>{children}</MobileLayout>
        </LayoutRoot>
      )}
      {deviceType === 'desktop' && (
        <LayoutRoot className="desktop">
          <DesktopLayout>{children}</DesktopLayout>
        </LayoutRoot>
      )}
    </>
  );
};

Layout.propTypes = {};

export default React.memo(Layout);
