import React from 'react';
import Home from '../container/Home';
const Index = ({ products, banners }) => {
  return (
    <>
      <Home products={products} bannerList={banners} />
    </>
  );
};

Index.propTypes = {};

export async function getServerSideProps(context) {
  const { req } = context;
  const resProduct = await fetch('https://zfit-data.s3.ap-northeast-2.amazonaws.com/data/products.json'); // 프로덕트 전체
  const dataProduct = await resProduct.json();
  const objectProduct = Object.keys(dataProduct.products);
  let products = [];
  objectProduct.map(productId => {
    dataProduct.products[productId].colors.map(item => {
      products.push({ ...dataProduct.products[productId], color: item.color, sizes: item.sizes, src: item.src });
    });
  });

  const resBrand = await fetch('https://zfit-data.s3.ap-northeast-2.amazonaws.com/data/brands.json'); // 모바일 홈 배너에 보여줄 브랜드
  const brandData = await resBrand.json();
  const objectBrand = Object.keys(brandData.brands);
  let banners = [];
  objectBrand.map(brandId => {
    banners.push(brandData.brands[brandId]);
  });
  return { props: { products, banners } };
}

export default Index;
