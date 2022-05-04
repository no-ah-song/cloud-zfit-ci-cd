import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import styled from "styled-components";
import PropTypes from "prop-types";
import { colorAndSizeState, selectedProductState, fittingIsOpenState, fittingImagesState } from "../recoil/state";
import { useSetRecoilState, useResetRecoilState } from 'recoil';

const ProductList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  & > div {
    border-bottom: 1px solid black;
    border-right: 1px solid black;
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
`;
const ProductInfo = styled.div`
  text-align: left;
  padding: 8px 8px 0px 8px;
  display: flex;
  justify-content: space-between;
  height: 88px;
  & > div:nth-child(1) > div {
    padding-right:18px;
    word-break: keep-all;
  }
  &>div{
    flex: 1 1 0;
  }
`;

const Products = ({ productList = [] }) => {
  useEffect(() => {}, [productList]);
  const setSelectedProduct = useSetRecoilState(selectedProductState);
  const setFittingIsOpen = useSetRecoilState(fittingIsOpenState);
  const resetColorAndSize = useResetRecoilState(colorAndSizeState);
  const resetFittingImage = useResetRecoilState(fittingImagesState);
  const handleClick = useCallback((product) => {
    async function fetchData() {
      resetColorAndSize();
      resetFittingImage();
      setSelectedProduct({...product, color: product.color, sizes: product.sizes});
    }
    fetchData();
    setFittingIsOpen(true);
  },[]);

  return (
    <ProductList>
      {productList.map((product, index) => {
        return (
          <div key={index}>
            <ProductInfo>
              <div>
                <div><b>{product.productName}</b></div>
                <div><b>{product.color}</b></div>
                {/* <div>{product.brandName}</div> // 일단 브랜드 네임 빼기*/} 
              </div>
              <div className="text-end text-nowrap" role="button" onClick={()=>handleClick(product)}>View Fitting↗</div>
            </ProductInfo>
            <ProductItem>
              <Image src={product.src||"/noimage.png"} layout="fill" />
            </ProductItem>
          </div>
        );
      })}
    </ProductList>
  );
};

Products.propTypes = {};

export default Products;
