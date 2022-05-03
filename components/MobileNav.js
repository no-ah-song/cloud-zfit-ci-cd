import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductsHorizontal from "./ProductsHorizontal";
import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";
import { getBrandList } from "../api/api";

/* eslint-disable */
const MenuRoot = styled.div`
  position: fixed;
  z-index: 999;
  top: 48px;
  bottom: 0;
  background: white;
  width: 100%;
  max-width: 100%;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  left: -100%;
  transition: transform 0.4s;
  ${(props) => (props.isOpen ? "transform: translate(100%, 0);" : "")}

  display: flex;
  justify-content: space-between;
  flex-flow: column;
  height: calc(100vh - 48px);
`;
const Container = styled.div`
  &.tab__container {
    .nav {
      .active {
      }
      .nav-link {
      }
    }
    .nav-tabs {
      display: flex;
      width: 100%;
      justify-content: space-between;
      height: 48px;
      padding: 0 58px;
      border-bottom: solid 1px black;
    }
    .nav-link {
      border: 0;
      color: #ababab;
      font-weight: 600;
    }
    .nav-tabs .nav-link.active {
      color: black;
      background: none;
    }
    .list-group {
      .list-group-item {
        padding: 0 0 0 24px;
        height: 48px;
        line-height: 48px;
        border-bottom: solid 1px black;
      }
    }
    .brand-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      li {
        border-bottom: 1px solid black;
        border-right: 1px solid black;
        padding-top: 100%;
        position: relative;
        text-align: center;
        & > div {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    }
  }
  &.product__container {
    padding: 48px 0 0 0;
    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 48px;
      text-align: center;
      border-bottom: solid 1px black;
      border-top: solid 1px black;
      margin: 0;
      font-weight: 600;
      font-size: 12px;
      line-height: 14px;
    }
  }
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

const MobileNav = ({ isOpen, recommendedProducts }) => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    if (isOpen) {
      // document.body.style.overflow = "hidden";
    } else {
      //document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  useEffect(() => {
    async function fetchData() {
      const response = await getBrandList();
      setBrands(response);
    }
    fetchData();
  }, []);

  return (
    <React.Suspense fallback={<div>Loading</div>}>
      <MenuRoot isOpen={isOpen}>
        <Container className="tab__container">
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                className="nav-link active"
                id="nav-home-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-home"
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                Men
              </button>
              <button
                className="nav-link"
                id="nav-profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-profile"
                type="button"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
              >
                Women
              </button>
              <button
                className="nav-link"
                id="nav-contact-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-contact"
                type="button"
                role="tab"
                aria-controls="nav-contact"
                aria-selected="false"
              >
                Brand
              </button>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <a href="/products?gender=men&type=all">ALL</a>
                </li>
                <li className="list-group-item"><a href="/products?gender=men&type=top">Top</a></li>
                <li className="list-group-item"><a href="/products?gender=men&type=bottom">Bottom</a></li>
                <li className="list-group-item"><a href="/products?gender=men&type=outer">Outer</a></li>
              </ul>
            </div>
            <div
              className="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
            >
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <a href="/products?gender=women&type=all">ALL</a>
                </li>
                <li className="list-group-item"><a href="/products?gender=women&type=top">Top</a></li>
                <li className="list-group-item"><a href="/products?gender=women&type=bottom">Bottom</a></li>
                <li className="list-group-item"><a href="/products?gender=women&type=outer">Outer</a></li>
              </ul>
            </div>
            <div
              className="tab-pane fade"
              id="nav-contact"
              role="tabpanel"
              aria-labelledby="nav-contact-tab"
            >
              <ul className="list-group list-group-flush brand-list">
                {brands.length > 0 &&
                  brands.map((brand, index) => {
                    const to = `/brand?brand=${brand.brandId}`;
                    return (
                      <li key={index}>
                        <div>
                          <BrandInfo>
                            <div>
                              <div>{brand.brandName}</div>
                            </div>
                            <div>
                              <a href={to}>View →</a>
                            </div>
                          </BrandInfo>
                          <BrandItem>
                            <BrandImageBox>
                              <Image
                                src={brand.logo||"/noimage.png"}
                                width={72}
                                height={72}
                              />
                            </BrandImageBox>
                          </BrandItem>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </Container>
        <Container className="product__container">
          <div className="row title">⟵ Recommended Styles ⟶</div>
          <ProductsHorizontal />
        </Container>
      </MenuRoot>
    </React.Suspense>
  );
};

MobileNav.propTypes = {};

export default React.memo(MobileNav);
