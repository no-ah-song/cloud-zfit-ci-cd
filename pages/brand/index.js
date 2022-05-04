import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Layout from "../../components/Layout";
import Products from "../../components/Products";
import Brands from "../../components/Brands";

const Container = styled.div`
  width: 100%;
  &.top__container {
    display: flex;
    min-height: 96px;
    padding: 8px;
    justify-content: space-between;
    border-bottom: 1px solid black;
    flex-wrap: wrap;
    flex-flow:column;
    .bottom__text {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .bottom__text.active {
      display: block;
    }
  }
  &.middle__container {
  }
  &.bottom__container {
    padding: 0px;
    text-align: center;
  }
  @media only screen and (min-width: 600px) {
    &.top__container {
      height: 119px;
    }
  }
  @media only screen and (min-width: 2000px) {
    grid-template-columns: repeat(8, 1fr);
  }
`;

const Index = ({ products, brands }) => {
  const router = useRouter();
  const { brand } = router.query;
  return (
    <>
      <Layout>
        {brand && (
          <>
            <Container className="top__container">
              <h4>{brands[0].brandName}</h4>
              <div className="bottom__text">{brands[0].summary}</div>
            </Container>
            <Container className="middle__container"></Container>
            <Container className="">
              <Products productList={products}></Products>
            </Container>
          </>
        )}
        {!brand && (
          <>
            <Container className="bottom__container">
              <Brands brandList={brands} />
            </Container>
          </>
        )}
      </Layout>
    </>
  );
};

Index.propTypes = {};

export async function getServerSideProps(context) {
  const { brand } = context.query;
  const resProduct = await fetch("https://zfit-data.s3.ap-northeast-2.amazonaws.com/data/products.json");
  const dataProduct = await resProduct.json();
  const objectProduct = Object.keys(dataProduct.products);
  let products = [];
  // objectProduct.map((productId)=>{
  //   if(dataProduct.products[productId].brandId === brand){
  //     products.push(dataProduct.products[productId]);
  //   }
  // })
  objectProduct.map((productId)=>{
    dataProduct.products[productId].colors.map((item)=>{
      products.push({...dataProduct.products[productId],color:item.color, sizes:item.sizes, src:item.src});
    })
  });
  const resBrand = await fetch("https://zfit-data.s3.ap-northeast-2.amazonaws.com/data/brands.json");
  const brandData = await resBrand.json();
  const objectBrand = Object.keys(brandData.brands);
  let brands = [];
  objectBrand.map((brandId)=>{
    if(brand){
      brands.push(brandData.brands[brand]);
    }else{
      brands.push(brandData.brands[brandId]);
    }
  })
  return { props: { products, brands } };
}
export default React.memo(Index);
