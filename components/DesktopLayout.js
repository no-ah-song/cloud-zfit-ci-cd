import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from './Header';
import DesktopNav from './DesktopNav';
import Fitting from '../container/Fitting';
import Main from './Main';
import { fittingIsOpenState } from '../recoil/state';
import { useRecoilState } from 'recoil';

const LayoutTemplate = styled.div`
  width: 100%;
  max-width: 100%;
  position: relative;
  margin: auto;
  overflow-x: hidden;
  .bottom__grid {
    display: grid;
    grid-template-columns: 144px 1fr;
  }
  @media only screen and (min-width: 800px) {
    max-width: 100%;
  }
`;

const initialState = { menuIsOpen: false, fittingIsOpen: false };
const reducer = (state, action) => {
  switch (action.type) {
    case 'MENU_OPEN':
      return { menuIsOpen: true };
    case 'MENU_CLOSE':
      return { menuIsOpen: false };
    case 'FITTING_OPEN':
      return { fittingIsOpen: true };
    case 'FITTING_CLOSE':
      return { fittingIsOpen: false };
    default:
      throw new Error();
  }
};

const DesktopLayout = ({ children }) => {
  const [fittingIsOpen, setFittingIsOpen] = useRecoilState(fittingIsOpenState);
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {}, [fittingIsOpen]);

  return (
    <>
      <LayoutTemplate>
        <Header></Header>
        <div className="bottom__grid">
          <DesktopNav />
          <Fitting onClickClose={() => setFittingIsOpen(false)} isOpen={fittingIsOpen} />
          <div className="p-0">
            {/* <SideNav /> */}
            <Main>{children}</Main>
          </div>
        </div>
      </LayoutTemplate>
    </>
  );
};

DesktopLayout.propTypes = {};

export default React.memo(DesktopLayout);
