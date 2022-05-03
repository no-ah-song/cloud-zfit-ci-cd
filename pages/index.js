import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Home from "../container/Home";
const Index = ({ products, banners }) => {
  return (
    <>
      <Home products={products} bannerList={banners} />
    </>
  );
};

Index.propTypes = {};

export async function getServerSideProps(context) {
  const { gender, type, brand } = context.query;
  const resProduct = await fetch("http://localhost:3001/data/products.json"); // 프로덕트 전체
  const dataProduct = await resProduct.json();
  const objectProduct = Object.keys(dataProduct.products);
  let products = [];
  objectProduct.map((productId)=>{
    products.push(dataProduct.products[productId])
  });

  const resBrand = await fetch("http://localhost:3001/data/brands.json"); // 모바일 홈 배너에 보여줄 브랜드
  const brandData = await resBrand.json();
  const objectBrand = Object.keys(brandData.brands);
  let banners = [];
  objectBrand.map((brandId)=>{
    banners.push(brandData.brands[brandId])
  });
  return { props: { products, banners } };
}

export default Index;
