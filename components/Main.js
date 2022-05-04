import React from "react";
import styled from "styled-components";

const MainRoot = styled.div`
  overflow: hidden;
  height: calc(100vh - 48px);
  overflow-y: scroll;
  padding-bottom: calc(1rem + constant(safe-area-inset-bottom));
  --ion-safe-area-top: env(safe-area-inset-top);
  padding-bottom: calc(1rem + var(--safe-area-inset-top));
  @media only screen and (min-width: 600px) {
    height: calc(100vh - 48px);
    overflow-y: scroll;
  }
`;
const Main = ({ children }) => {
  return (
    <MainRoot className="main-wrapper w-100 oh d-block">{children}</MainRoot>
  );
};

export default Main;
