import React, { useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';
import ProductsHorizontal from '../components/ProductsHorizontal';
import FittingViewer from './FittingViewer';
import { StyleController } from '../container/FittingController';
import Close from '../assets/icon-close-white.svg';
import ZfitLogo from '../assets/icon-fitting-zfit.svg';

const Fitting = ({ onClickClose, isOpen }) => {

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('scroll-hidden');
    } else {
      document.body.classList.remove('scroll-hidden');
    }
  }, [isOpen]);

  // const handler = useCallback(() => {
  //   if (!matches) {
  //     if (isOpen) {
  //       document.body.classList.add('scroll-hidden');
  //     } else {
  //       document.body.classList.remove('scroll-hidden');
  //     }
  //   }
  // }, [isOpen]);

  // useEffect(() => {
  //   window.matchMedia('(min-width: 600px)').addEventListener('change', e => setMatches(e.matches));
  // }, []);

  return (
    <FittingRoot isOpen={isOpen}>
      <Container className="header__container">
        <div className="p-1 bg-black text-white">
          <div className="d-flex flex-wrap align-items-center h-100 justify-content-between">
            <div />
            <div className="header-center-text">
              <ZfitLogo />
              <span>Fitting Room</span>
            </div>
            <div className="text-end px-3" onClick={onClickClose} role="button">
              <Close />
            </div>
          </div>
        </div>
      </Container>
      <Container className="model__container">
        <FittingViewer />
      </Container>
      <Container className="bottom__container">
        <div>
          <StyleController isOpen={isOpen} />
        </div>
      </Container>
    </FittingRoot>
  );
};

const FittingRoot = styled.div`
  position: fixed;
  z-index: 999;
  bottom: -100vh;
  background: white;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  transition: transform 0.4s;
  ${props => (props.isOpen ? 'transform: translate(0, calc(-100vh));' : '')}
  @media only screen and (min-width: 600px) {
    right: 0;
    top: unset;
    left: unset;
    bottom: -100vh;
    width: 400px;
    height: 700px;
    ${props => (props.isOpen ? 'transform: translate(0, calc(-100vh));' : '')}
  }
`;
const Container = styled.div`
  .title {
    text-align: center;
    padding: 12px;
  }
  &.model__container {
    height: 100%;
    background: white;
    position: relative;
    padding: 0;
    margin: 0;
  }
  &.bottom__container {
    position: absolute;
    bottom: 0;
    max-height: 337px;
    width: 100%;
    z-index: 999;
    & > div {
      width: 90%;
      margin: auto;
      font-weight: 600;
      border-radius: 4px;
    }
  }

  &.header__container {
    position: absolute;
    top: 16px;
    z-index: 999;
    width: 100%;
    & > div {
      width: 90%;
      margin: auto;
      height: 48px;
      font-weight: 600;
      border-radius: 4px;
    }
    .header-center-text {
      display: flex;
      text-align: center;
      column-gap: 4px;
      margin-left: 48px;
      span {
        line-height: 15px;
      }
    }
  }
`;

Fitting.propTypes = {};

export default React.memo(Fitting);
