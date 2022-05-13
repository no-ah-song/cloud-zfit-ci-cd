import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from './Header';
import DesktopNav from './DesktopNav';
import Fitting from '../container/Fitting';
import Main from './Main';
import Image from 'next/image';
import { fittingIsOpenState, selectedProductState, colorAndSizeState } from '../recoil/state';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {getProductsAvatar} from '../api/api'
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
  width: 15%;
  bottom: 16px;
  margin: 16px;
  font-size: 16px;
  text-align: right;
  float: right;
  button {
    height: 100%;
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
    width: 100%;
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
  const setSelectedProduct = useSetRecoilState(selectedProductState);
  const setColorAndSize = useSetRecoilState(colorAndSizeState);
  useEffect(() => {}, [fittingIsOpen]);
  const handleClick = async () => {
    async function fetchData () {
      return await getProductsAvatar()
    }
    const product = await fetchData();
    setSelectedProduct({ ...product, color: product.color, sizes: product.sizes });
    product.colors.map(item => {
      if (item.color === product.color) {
        setColorAndSize({ color: product.color, size: item.sizes[0] }); // Set colorAndSize state
      }
    });
    setFittingIsOpen(true);
  };
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
        <button onClick={handleClick}>
          <Image src="/images/small_z-fit.png" width={15} height={15} />
          Fitting Room↗
        </button>
      </StickyFooter>
    </>
  );
};

DesktopLayout.propTypes = {};

export default React.memo(DesktopLayout);
