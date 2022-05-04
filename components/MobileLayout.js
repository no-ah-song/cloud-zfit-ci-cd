import React, { useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Header from "./Header";
import MobileNav from "./MobileNav";
import Fitting from "../container/Fitting";
import Footer from "./Footer";
import Main from "./Main";
import { fittingIsOpenState, menuIsOpenState, selectedProductState } from "../recoil/state";
import { useRecoilState, useResetRecoilState } from 'recoil';

//const Menu = dynamic(() => import('./Menu'), { suspense: true })
const LayoutTemplate = styled.div`
  width: 100%;
  height: 100vh;
  max-width: 100%;
  position: relative;
  margin: auto;
  overflow-x: hidden;
  @media only screen and (min-width: 800px) {
    max-width: 100%;
  }
`;

const StickyFooter = styled.div`
  position: sticky;
  bottom: calc(env(safe-area-inset-bottom) + 60px);
  max-width: 100%;
  margin: auto;
  font-size: 16px;
  text-align: center;
  button {
    width: 90%;
    height: 100%;
    padding: 14.5px;
    background: white;
    color: black;
    border-radius: 4px;
    border: solid 1px black;
    font-weight: 600;
  }
`;

const initialState = { menuIsOpen: false, fittingIsOpen: false };
const reducer = (state, action) => {
  switch (action.type) {
    case "MENU_OPEN":
      return { menuIsOpen: true };
    case "MENU_CLOSE":
      return { menuIsOpen: false };
    case "FITTING_OPEN":
      return { fittingIsOpen: true };
    case "FITTING_CLOSE":
      return { fittingIsOpen: false };
    default:
      throw new Error();
  }
};

const MobileLayout = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [fittingIsOpen, setFittingIsOpen] = useRecoilState(fittingIsOpenState);
  const resetSelectedProduct = useResetRecoilState(selectedProductState);
  const [menuIsOpen, setMenuIsOPen] = useRecoilState(menuIsOpenState);
  useEffect(() => {
  }, [dispatch]);

  return (
    <>
      <LayoutTemplate>
        <Header
          onClickOpen={() => dispatch({ type: "MENU_OPEN" })}
          onClickClose={() => dispatch({ type: "MENU_CLOSE" })}
          isOpen={state.menuIsOpen}
        ></Header>
        <MobileNav
          onClickClose={() => dispatch({ type: "MENU_CLOSE" })}
          isOpen={state.menuIsOpen}
        />

        <Fitting
          onClickClose={() => setFittingIsOpen(false)}
          isOpen={fittingIsOpen}
        />
        <div style={{ display: "flex" }}>
          {/* <SideNav /> */}
          <Main>{children}</Main>
        </div>
        <Footer> </Footer>
      </LayoutTemplate>
      <StickyFooter>
        <button onClick={() => {setFittingIsOpen(true); resetSelectedProduct()}}>
          Fitting Room↗
        </button>
      </StickyFooter>
    </>
  );
};

MobileLayout.propTypes = {};

export default React.memo(MobileLayout);
