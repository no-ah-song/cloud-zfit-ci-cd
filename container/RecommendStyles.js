import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ProductsHorizontal from '../components/ProductsHorizontal';
import { selectedProductState } from '../recoil/state';
import { useRecoilValue } from 'recoil';
import { getBrandProducts } from '../api/api';
import IconHanger from '../assets/icon-hanger.svg';

const RecommendStyles = () => {
  const [active, setActive] = useState(false);
  const selectedProduct = useRecoilValue(selectedProductState); // selected product info state
  const [productList, setProductList] = useState();

  useEffect(() => {
    async function fetchData() {
      const result = await getBrandProducts({ brand: selectedProduct.brandId });
      setProductList(result);
    }
    fetchData();
  }, [selectedProduct]);

  useEffect(() => {
    return function cleanup() {
      handleClickClose();
    };
  }, [selectedProduct]);

  const handleClickClose = () => {
    setActive(false);
  };

  const handleClick = () => {
    setActive(true);
  };

  return (
    <RecommendStylesRoot>
      <div>
        <button onClick={handleClick}>
          <div>STYLES</div>
        </button>
      </div>
      <DarkenBackground active={active}>
        <SelectArea>
          <div className="recommend-header p-1 bg-black text-white">
            <div className="d-flex flex-wrap align-items-center justify-content-between p-4">
              <div />
              <div className="header-center-text">
              <IconHanger/><span>Recommended Styles</span>
              </div>
              <div className="text-end" role="button" onClick={handleClickClose}>
                Close
              </div>
            </div>
          </div>
          <div className="recommended-style-box">
            <div className="row">
              <div className="col col-12 p-0">
                <ProductsHorizontal itemWidth={145} productList={productList} />
              </div>
            </div>
          </div>
        </SelectArea>
      </DarkenBackground>
    </RecommendStylesRoot>
  );
};

const RecommendStylesRoot = styled.div`
  widht: 100%;
  border-radius: 4px;
  .header-center-text {
    display: flex;
    text-align: center;
    column-gap: 4px;
    font-weight: 600;
    align-items: center;
    span {
      line-height: 15px;
    }
  }
  button {
    width: 48px;
    height: 48px;
    border-radius: 4px;
    border: solid 1px black;
    background: white;
    color: black;
  }

`;

const DarkenBackground = styled.div`
display: ${props => (props.active ? 'block' : 'none')};
position: fixed;
top: 0;
width: 100%;
height: 100%;
left: 0;
background:rgb(0 0 0 / 70%);
`;

const SelectArea = styled.div`
  border-radius: 4px;
  margin: 16px;
  top: 50%;
  position: relative;
  transform: translate(0,-50%);
  .recommend-header {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    font-weight: 400;
  }
  .recommended-style-box {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    .row {
      margin: auto;
      background: white;
    }
    .col {
      padding: 17px 0;
    }
  }
`;

RecommendStyles.propTypes = {};

export default RecommendStyles;
