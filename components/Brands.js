import React, { useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import PropTypes from "prop-types";

const BrandList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  & > div {
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    padding-top: 100%;
    position: relative;
  }
  @media only screen and (min-width: 600px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media only screen and (min-width: 2000px) {
    grid-template-columns: repeat(8, 1fr);
  }
  a {
    color: black;
    text-decoration: none;
  }
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;
const BrandItem = styled.div`
  position: absolute;
  width: 100%;
  background: white;
  top: 50%;
  transform: translate(0, -50%);
`;
const BrandImageBox = styled.div``;
const BrandInfo = styled.div`
  text-align: left;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  & > div:nth-child(1) > div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const Brands = ({ brandList }) => {
  useEffect(() => {}, [brandList]);
  return (
    <BrandList>
      {brandList.map((brand, index) => {
        const viewLink = `/brand?brand=${brand.brandId}`;
        return (
          <div key={index}>
            <Container>
              <BrandInfo>
                <div>
                  <div>{brand.brandName}</div>
                </div>
                <div>
                  <Link href={viewLink}>View→</Link>
                </div>
              </BrandInfo>
              <BrandItem>
                <BrandImageBox>
                  <Image
                    src="/images/Rectangle Brand.jpg"
                    width={72}
                    height={72}
                  />
                </BrandImageBox>
              </BrandItem>
            </Container>
          </div>
        );
      })}
    </BrandList>
  );
};

Brands.propTypes = {};

export default Brands;
