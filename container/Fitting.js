import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import FittingViewer from './FittingViewer';
import { StyleController } from '../container/FittingController';
import Close from '../assets/icon-close-white.svg';
import ZfitLogo from '../assets/icon-fitting-zfit.svg';
import FitmapController from './FitmapController';
import ColorController from './ColorController';
import SizeController from './SizeController';
import { getFittingImages, getDefaultFittingImages } from '../api/api';

import { fittingSelector, fittingImagesState } from '../recoil/state';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
const Fitting = ({ onClickClose, isOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const countRef = useRef(0);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('scroll-hidden');
    } else {
      document.body.classList.remove('scroll-hidden');
    }
  }, [isOpen]);

  const ref = useRef();
  const [width, setWidth] = useState();

  useEffect(() => {
    setWidth(parseInt(ref.current.clientHeight * 0.5));
  }, []);

  const fitting = useRecoilValue(fittingSelector); // fitting 이미지를 불러올 데이터
  const setFittingImages = useSetRecoilState(fittingImagesState);
  const resetFittingImages = useResetRecoilState(fittingImagesState);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        if (fitting.productId === 'a0518ed8-7873-43da-84a2-57a7baa008bb') {
          const response = await getDefaultFittingImages(fitting);
          setFittingImages({ ...response, fitmap: fitting.fitmap });
        } else {
          const response = await getFittingImages(fitting);
          setFittingImages({ ...response, fitmap: fitting.fitmap });
        }
        setIsLoading(false);
      } catch {
        resetFittingImages();
      }
    }
    countRef = countRef.current + 1;
    if (fitting.brandId && fitting.productId && fitting.color && fitting.size && fitting.gender && fitting.height) {
      fetchData();
    }
  }, [fitting]);

  return (
    <FittingRoot isOpen={isOpen} ref={ref} width={width}>
      {isLoading && (
        <Loading>
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </Loading>
      )}
      <Container className="root__container">
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
        <Container className="float__container">
          <Wrapper>
            <div>
              <div>
                <FitmapController />
              </div>
              <div>
                <ColorController />
              </div>
              <div>
                <SizeController />
              </div>
            </div>
          </Wrapper>
        </Container>
        <Container className="bottom__container">
          <div>
            <StyleController isOpen={isOpen} />
          </div>
        </Container>
      </Container>
    </FittingRoot>
  );
};
const Loading = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  .spinner-border {
    width: 6rem;
    height: 6rem;
    border: 0.45em solid currentColor;
    border-right-color: transparent;
  }
`;

const FittingRoot = styled.div`
  position: fixed;
  z-index: 999;
  bottom: -100vh;
  background: white;
  width: 100%;
  height: 100%;
  transition: transform 0.4s;
  ${props => (props.isOpen ? 'transform: translate(0, calc(-100vh));' : '')}
  @media only screen and (min-width: 600px) {
    right: 0;
    top: unset;
    left: unset;
    bottom: -100vh;
    height: 90%;
    // min-width: 30%;
    width: ${props => (props.width ? props.width : '0')}px;
    margin: 0 auto;
    ${props => (props.isOpen ? 'transform: translate(0, calc(-100vh));' : '')}
  }
`;
const Container = styled.div`
  .title {
    text-align: center;
    padding: 12px;
  }
  &.root__container {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  &.model__container {
    height: 100%;
    background: white;
    position: relative;
    padding: 0;
    margin: 0;
  }
  &.float__container {
    position: absolute;
    bottom: 70px;
    width: 100%;
  }
  &.bottom__container {
    position: absolute;
    bottom: 0;
    max-height: 30%;
    overflow: auto;
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

const Wrapper = styled.div`
  width: 90%;
  margin: auto;
  & > div {
    z-index: 999;
    position: relative;
    bottom: 0;
    & > div {
      padding-top: 12px;
    }
  }
`;
Fitting.propTypes = {};

export default React.memo(Fitting);
