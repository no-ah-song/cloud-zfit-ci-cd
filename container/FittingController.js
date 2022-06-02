import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import { useSsrComplectedState } from '../recoil/state';
import FittingBasicTab from '../components/FittingBasicTab';
import FittingShapeTab from '../components/FittingShapeTab';
import FittingAdvancedTab from '../components/FittingAdvancedTab';

const StyleController = ({ isOpen }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [isOpen]);

  return (
    <>
      <StyleControlBox className={activeIndex === 0 ? 'style-control-box active' : 'style-control-box'}>
        <ControlBox />
      </StyleControlBox>
    </>
  );
};

const StyleControlBox = ({ title, children, ...rest }) => {
  const setSsrCompleted = useSsrComplectedState();
  const [isOpen, setIsOpen] = useState(true);
  useEffect(setSsrCompleted, [setSsrCompleted]);

  return (
    <div>
      <StyledControlContainer {...rest}>
        <ControlHeader onClick={() => setIsOpen(!isOpen)} role="button">
          {isOpen ? (
            <div className="row">
              <div className="col col-12 d-flex">
                <span className="text-start w-100 px-4 text-nowrap">
                  <b>Body Info</b>
                </span>
                <span className="text-end px-4 text-nowrap">
                  <b>↓</b>
                </span>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col col-12 d-flex">
                <span className="text-start w-100 px-4 text-nowrap">
                  <b>Body Info</b>
                </span>
                <span className="text-end px-4 text-nowrap">
                  <b>↑</b>
                </span>
              </div>
            </div>
          )}
        </ControlHeader>
        <ControllBody className={!isOpen && 'style-body-close'}>{children}</ControllBody>
      </StyledControlContainer>
    </div>
  );
};

const ControlBox = () => {
  return (
    <ControlTab>
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            className="nav-link active"
            id="nav-basic-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-basic"
            type="button"
            role="tab"
            aria-controls="nav-basic"
            aria-selected="true">
            Basic
          </button>
          <button
            className="nav-link"
            id="nav-shape-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-shape"
            type="button"
            role="tab"
            aria-controls="nav-shape"
            aria-selected="false">
            Shape
          </button>
          <button
            className="nav-link"
            id="nav-advanced-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-advanced"
            type="button"
            role="tab"
            aria-controls="nav-advanced"
            aria-selected="false">
            Advanced
          </button>
        </div>
      </nav>
      <div className="tab-content">
        <div className="tab-pane fade show active" id="nav-basic" role="tabpanel" aria-labelledby="nav-basic-tab">
          <FittingBasicTab />
        </div>
        <div className="tab-pane fade" id="nav-shape" role="tabpanel" aria-labelledby="nav-shape-tab">
          <FittingShapeTab />
        </div>
        <div className="tab-pane fade" id="nav-advanced" role="tabpanel" aria-labelledby="nav-advanced-tab">
          <FittingAdvancedTab />
        </div>
      </div>
    </ControlTab>
  );
};
const StyledControlContainer = styled.div`
  background: white;
  border-radius: 4px 4px 0px 0px;
  border: 1px solid black;
  overflow: hidden;
  display: none;
  &.active {
    display: block;
  }
  .style-body-close {
    display: none;
  }
`;

const ControlTab = styled.div`
  .nav-tabs {
    padding: 0 24px;
  }
  button.nav-link {
    padding: 17px;
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    color: #ababab;
    border: 0;
    flex: 1 1;
  }
  .nav-link.active {
    color: black;
    border-bottom: 2px solid black;
  }
  .col-header {
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    align-items: center;
    display: flex;
  }
  .tab-content {
    padding: 0 0 12px 0;
  }
`;
const ControlHeader = styled.div`
  font-weight: 400;
  text-align: center;
  padding: 17px 0;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
`;

const ControllBody = styled.div`
  font-weight: 400;
  text-align: center;
  height: 100%;
  overflow-y: auto;
  .row {
    margin: 0;
    padding: 0;
  }
`;
export { StyleControlBox, StyleController };
