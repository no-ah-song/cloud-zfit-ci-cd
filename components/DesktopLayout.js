import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from './Header';
import DesktopNav from './DesktopNav';
import Fitting from '../container/Fitting';
import Main from './Main';
import Image from 'next/image';
import { fittingIsOpenState, selectedProductState } from '../recoil/state';
import { useRecoilState, useResetRecoilState } from 'recoil';

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
const StickyFooter = styled.div`
  position: sticky;
  width: 100%;
  bottom: 16px;
  margin: 16px;
  font-size: 16px;
  text-align: right;
  display: flex;
  float: right;
  justify-content: right;
  button {
    height: 100%;
    width: 15%;
    padding: 18px;
    background: white;
    color: black;
    border-radius: 4px;
    border: solid 1px black;
    font-weight: 600;
    display: flex;
    justify-content: center;
    column-gap: 4px;
    white-space: nowrap;
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
  const resetSelectedProduct = useResetRecoilState(selectedProductState);
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
      <StickyFooter>
        <button
          onClick={() => {
            setFittingIsOpen(true);
            resetSelectedProduct();
          }}>
          <Image src="/images/small_z-fit.png" width={15} height={15}/>
          Fitting Room↗
        </button>
      </StickyFooter>
    </>
  );
};

DesktopLayout.propTypes = {};

export default React.memo(DesktopLayout);
