import React, { useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import PropTypes from "prop-types";

const ProductList = styled.div`
  display: flex;
  overflow: scroll;
  & > div {
    border-bottom: 1px solid black;
    border-right: 1px solid black;
  }
`;
const ProductItem = styled.div`
  position: relative;
  padding-top: 145%;
  //width: ${props=>props.width?props.width+"px":"195px"};
  min-width: ${props=>props.width?props.width+"px":"195px"};
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

const ProductsHorizontal = ({ productList=[], itemWidth }) => {
  useEffect(() => {}, [productList]);
  return (
    <ProductList>
      {productList.map((product, index) => {
        return (
          <div key={index}>
            <ProductInfo>
              <div>
                <div>{product.productName}</div>
                <div>{product.brandName}</div>
              </div>
              <div>View Fitting↗</div>
            </ProductInfo>
            <ProductItem width={itemWidth}>
              <Image src="/images/Rectangle 248.jpg" layout="fill" />
            </ProductItem>
          </div>
        );
      })}
    </ProductList>
  );
};

ProductsHorizontal.propTypes = {};

export default ProductsHorizontal;
