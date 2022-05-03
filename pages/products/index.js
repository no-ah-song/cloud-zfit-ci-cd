import React, { useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Layout from "../../components/Layout";
import Products from "../../components/Products";

const Container = styled.div`
  &.bottom__container {
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
const Index = ({ products }) => {
  const router = useRouter();
  const { gender } = router.query;
  useEffect(() => {}, []);

  return (
    <>
      <Layout>
        <Container>
          <div className="border-bottom border-dark title">
            {" "}
            {gender === "women" && "WOMEN"} {gender === "men" && "MEN"}
          </div>
          <Products productList={products}></Products>
        </Container>
      </Layout>
    </>
  );
};

Index.propTypes = {};

export async function getServerSideProps(context) {
  const { gender, type, brand } = context.query;
  const resCategory = await fetch("https://zfit-data.s3.ap-northeast-2.amazonaws.com/data/category.json");
  const dataCategory = await resCategory.json();
  let categoryProducts;
  if (gender === "men") {
    categoryProducts = dataCategory.products.men;
  } else if (gender === "women") {
    categoryProducts = dataCategory.products.women; // productId Array
  }
  const resAllProducts = await fetch("https://zfit-data.s3.ap-northeast-2.amazonaws.com/data/products.json");
  const dataAllProducts = await resAllProducts.json();
  const objectAllProducts = Object.keys(dataAllProducts.products);
  let genderProductObject = [];

  objectAllProducts.map((productId)=>{
    dataAllProducts.products[productId].colors.map((item)=>{
      genderProductObject.push({...dataAllProducts.products[productId],color:item.color, sizes:item.sizes, src:item.src});
    })
  });
  let genderProducts;
    genderProducts = genderProductObject.filter((_product) =>
      type != "all" ? _product.type.toLowerCase() === type : _product
    );

   const products = genderProducts.filter((_product)=>{
    const _products = categoryProducts.filter((productId) =>_product.productId === productId);
    return _products.length>0&&{..._products[0]}
  });
  return { props: { products } };
}
export default React.memo(Index);
