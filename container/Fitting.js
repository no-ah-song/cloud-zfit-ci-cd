import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";
import ProductsHorizontal from "../components/ProductsHorizontal";
import FittingViewer from "./FittingViewer";
import { StyleController } from "../container/FittingController";


const Fitting = ({ onClickClose, isOpen }) => {
  useEffect(()=>{
  },[]);

  useEffect(() => {
  }, [isOpen]);

  return (
      <FittingRoot isOpen={isOpen}>
        <Container className="header__container">
          <div className="p-1 bg-black text-white">
            <div className="d-flex flex-wrap align-items-center h-100">
              <div className="text-center w-100">Fitting room</div>
              <div
                className="text-start w-100 position-absolute text__left"
                onClick={onClickClose}
              >
                ← EXIT
              </div>
            </div>
          </div>
        </Container>
        <Container className="model__container">
          <FittingViewer/>
        </Container>
        <Container className="bottom__container">
          <div>
            <StyleController isOpen={isOpen}/>
          </div>
        </Container>
      </FittingRoot>
  );
};

const FittingRoot = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  bottom: 0;
  background: white;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  left: -100%;
  transition: transform 0.4s;
  ${(props) => (props.isOpen ? "transform: translate(100%, 0);" : "")}
  @media only screen and (min-width: 600px) {
    right: 0;
    top: unset;
    left: unset;
    width:400px;
    height: 700px;
    ${(props) => (props.isOpen ? "transform: translate(0, 0);" : "transform: translate(100%, 0)")}
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
    overflow: scroll;
    width: 100%;
    z-index:999;
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
  }
`;

Fitting.propTypes = {};

export default React.memo(Fitting);
