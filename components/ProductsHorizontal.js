import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { colorAndSizeState, selectedProductState, fittingIsOpenState } from '../recoil/state';
import { useSetRecoilState } from 'recoil';

const ProductList = styled.div`
  display: flex;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  & > div {
    border-bottom: 1px solid black;
    border-right: 1px solid black;
  }
`;
const ProductItem = styled.div`
  position: relative;
  padding-top: 145%;
  //width: ${props => (props.width ? props.width + 'px' : '195px')};
  min-width: ${props => (props.width ? props.width + 'px' : '195px')};
  background: white;
`;
const ProductInfo = styled.div`
  text-align: left;
  padding: 8px 8px 32px 8px;
  display: flex;
  justify-content: space-between;
  & > div:nth-child(1) > div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const ProductsHorizontal = ({ productList = [], itemWidth }) => {
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
                <div>{product.productName}</div>
                <div>{product.color}</div>
              </div>
              <div>View</div>
            </ProductInfo>
            <ProductItem width={itemWidth}>
              <Image src={product.src || '/noimage.png'} layout="fill" />
            </ProductItem>
          </div>
        );
      })}
    </ProductList>
  );
};

ProductsHorizontal.propTypes = {};

export default ProductsHorizontal;
