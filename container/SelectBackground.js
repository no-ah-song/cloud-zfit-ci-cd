import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { selectedProductState, backgroundState } from '../recoil/state';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getBrandBackground } from '../api/api';

const SelectBackground = ({ onClose }) => {
  const selectedProduct = useRecoilValue(selectedProductState);
  const [background, setBackground] = useRecoilState(backgroundState);
  const [backgroundList, setBackgroundList] = useState([]);
  const [active, setActive] = useState(1);

  useEffect(() => {
    setActive(background.selectedBackground);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const result = await getBrandBackground({ brandId: selectedProduct.brandId });
      setBackgroundList(result);
    }
    fetchData();
  }, [selectedProduct]);

  useEffect(() => {
    return function cleanup() {
      onClose();
    };
  }, [selectedProduct]);

  const handleClickBackground = useCallback(
    event => {
      const targetIndex = Number(event.target.dataset.targetIndex);
      setActive(targetIndex);
      setBackground({ selectedBackground: targetIndex });
    },
    [setBackground]
  );

  return (
    <SelectBackgroundRoot>
      <div className="background-header text-white">
        <div className="d-flex flex-wrap align-items-center justify-content-between p-4">
          <div className="text-end" role="button" onClick={onClose}>
            Close
          </div>
          <div className="header-center-text">
            <span>Fitting Room</span>
          </div>
          <div />
        </div>
      </div>
      <div className="background-style-box">
        <div className="row">
          <div className="col p-0">
            <div className="row" onClick={handleClickBackground}>
              {backgroundList[0] && (
                <div className="col col-6 p-0">
                  <BackgroundContainer>
                    <div className={active === 1 ? 'item-header active' : 'item-header'}>Brand Logo</div>
                    <div className="item-image">
                      <Image src={backgroundList[0]} layout={'fill'} data-target-index={1} />
                    </div>
                  </BackgroundContainer>
                </div>
              )}
              <div className="col col-6 p-0">
                <BackgroundContainer>
                  <div className={active === 0 ? 'item-header active' : 'item-header'} data-target-index={1}>
                    White
                  </div>
                  <div className="item-image">
                    <Image src="/images/brandBackground/white_background.png" layout={'fill'} data-target-index={0} />
                  </div>
                </BackgroundContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SelectBackgroundRoot>
  );
};

const SelectBackgroundRoot = styled.div`
  widht: 100%;
  border-radius: 4px;
  background: black;
  .header-center-text {
    display: flex;
    text-align: center;
    column-gap: 4px;
    font-weight: 600;
    span {
      line-height: 15px;
    }
  }
  .background-header {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    font-weight: 400;
    background: black;
  }
  .background-style-box {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    cursor: pointer;
    background: black;
    .row {
      margin: auto;
    }
    .col {
      padding: 17px 0;
    }
  }
`;

const BackgroundContainer = styled.div`
  background: black;
  padding: 8px;
  .item-header {
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    color: #777777;
    text-align: center;
    padding: 0 0 8px 0;
  }
  .item-header.active {
    color: white;
    &::before {
      content: '✓ ';
    }
  }
  .item-image {
    width: 100%;
    height: 128px;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
`;
SelectBackground.propTypes = {};

export default SelectBackground;
