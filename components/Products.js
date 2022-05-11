import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { colorAndSizeState, selectedProductState, fittingIsOpenState } from '../recoil/state';
import { useSetRecoilState } from 'recoil';

const ProductList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  & > div {
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    // box-shadow:
    // 1px 0 0 0 #000000,
    // 0 1px 0 0 #000000,
    // 1px 1px 0 0 #000000,
    // 1px 0 0 0 #000000 inset,
    // 0 1px 0 0 #000000 inset;
  }
  @media only screen and (min-width: 600px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media only screen and (min-width: 2000px) {
    grid-template-columns: repeat(8, 1fr);
  }
`;
const ProductItem = styled.div`
  position: relative;
  padding-top: 145%;
  width: 100%;
  background: white;
  img {
    width: 100% !important;
    height: auto !important;
    min-height: unset !important;
    max-height: unset !important;
  }
`;
const ProductInfo = styled.div`
  text-align: left;
  padding: 8px 8px 0px 8px;
  display: flex;
  justify-content: space-between;
  height: 88px;
  & > div:nth-child(1) > div {
    padding-right: 18px;
    word-break: keep-all;
  }
  & > div {
    flex: 1 1 0;
  }
`;

const Products = ({ productList = [] }) => {
  useEffect(() => {}, [productList]);
  const setSelectedProduct = useSetRecoilState(selectedProductState);
  const setFittingIsOpen = useSetRecoilState(fittingIsOpenState);
  const setColorAndSize = useSetRecoilState(colorAndSizeState);
  const handleClick = useCallback(product => {
    function fetchData() {
      setSelectedProduct({ ...product, color: product.color, sizes: product.sizes });
      product.colors.map(item => {
        if (item.color === product.color) {
          setColorAndSize({ color: product.color, size: item.sizes[0] }); // Set colorAndSize state
        }
      });
    }
    fetchData();
    setFittingIsOpen(true);
  }, []);

  return (
    <ProductList>
      {productList.map((product, index) => {
        return (
          <div key={index} onClick={() => handleClick(product)} role="button">
            <ProductInfo>
              <div>
                <div>
                  <b>{product.productName}</b>
                </div>
                <div>
                  <b>{product.color}</b>
                </div>
                {/* <div>{product.brandName}</div> // 일단 브랜드 네임 빼기*/}
              </div>
              <div className="text-end text-nowrap">View Fitting↗</div>
            </ProductInfo>
            <ProductItem>
              <Image src={product.src || '/noimage.png'} layout="fill" objectFit="cover" />
            </ProductItem>
          </div>
        );
      })}
    </ProductList>
  );
};

Products.propTypes = {};

export default Products;
