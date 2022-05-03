import React, { useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";

import Layout from "../components/Layout";
import Products from "../components/Products";

const Container = styled.div`
  &.bottom__container {
    padding: 0px;
    text-align: center;
  }
  .title {
    font-weight: 600;
    height: 48px;
    font-size: 12px;
    text-align: center;
    line-height: 48px;
  }
  @media only screen and (min-width: 800px) {
    .title {
      display: none;
    }
  }
`;
const SlideBanner = styled.div`
  .carousel-item {
    // height: 458px;
  }
  .carousel-top {
    padding: 8px;
    display: flex;
    min-height: 96px;
    justify-content: space-between;
    flex-flow: column;
    border-bottom: solid 1px black;
    .top__text {
      font-weight: 600;
      padding-bottom: 4px;
    }
    .bottom__text {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      margin-bottom: 20px;
    }
    .bottom__text.active {
      display: block;
    }
  }
  .carousel-bottom {
    position: relative;
    padding-top: 74%;
    background: grey;
  }
  .carousel-indicators {
    bottom: 0px;
    margin-bottom: 0;
    button {
      background: white;
      opacity: 1;
      background-clip: padding-box;
      width: 16px;
      height: 1px;
    }
  }
  .carousel-indicators button.active {
    background: black;
    opacity: 1;
    background-clip: padding-box;
  }
  @media only screen and (min-width: 800px) {
    .carousel {
      display: none;
    }
  }
`;

const Home = ({ products, bannerList }) => {
  return (
    <>
      <Layout>
        <SlideBanner>
          <BrandCarousel bannerList={bannerList} />
        </SlideBanner>
        <Container className="bottom__container">
          <div className="border-bottom border-dark title"> NEW IN </div>
          <Products productList={products} />
        </Container>
      </Layout>
    </>
  );
};

const BrandCarousel = ({ bannerList }) => {
  const ref = useRef([]);
  const handleCollapse = (index) => {
    if (ref.current[index].classList.contains("active")) {
      ref.current[index].classList.remove("active");
    } else {
      ref.current[index].classList.add("active");
    }
  };
  return (
    <div
      id="carouselExampleCaptions"
      className="carousel"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        {bannerList.map((banner, index) => {
          const label = `Slide ${index + 1}`;
          return (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current="true"
              aria-label={label}
            ></button>
          );
        })}
      </div>
      <div className="carousel-inner">
        {bannerList.map((banner, index) => {
          const to = `/brand?brand=${banner.brandId}`;
          return (
            <div
              key={index}
              className={index === 0 ? "carousel-item active" : "carousel-item"}
            >
              <div className="carousel-top">
                <div>
                  <div className="top__text">
                    <Link href={to} passHref>
                      <a href="/">{banner.brandName} →</a>
                    </Link>
                  </div>
                  <div
                    className="bottom__text"
                    ref={(el) => {
                      ref.current.push(el);
                    }}
                  >
                    {banner.summary}
                  </div>
                </div>
                <div
                  className="collapse-button"
                  onClick={() => handleCollapse(index)}
                >
                  View More
                </div>
              </div>
              <div className="carousel-bottom">
                {banner.src&&<Image src={banner.src} layout="fill" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
Home.propTypes = {};

export default Home;
