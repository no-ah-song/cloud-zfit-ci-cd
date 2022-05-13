import React, {useState,useEffect} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ProductsHorizontal from '../components/ProductsHorizontal';
import { selectedProductState } from '../recoil/state';
import { useRecoilValue } from 'recoil';
import { getBrandProducts } from '../api/api'

const RecommendStyles = ({onClose}) => {
  const selectedProduct = useRecoilValue(selectedProductState);
  const [productList, setProductList] = useState();

  useEffect(()=>{
    async function fetchData(){
      const result = await getBrandProducts({brand:selectedProduct.brandId});
      setProductList(result);
    }
    fetchData();
  },[]);

  useEffect(()=>{
    return function cleanup() {
      onClose()
    }
  },[selectedProduct])

  return (
    <RecommendStylesRoot>
      <div className="recommend-header p-1 bg-black text-white">
        <div className="d-flex flex-wrap align-items-center justify-content-between p-4">
          <div className="text-end" role="button" onClick={onClose}>
            Close
          </div>
          <div className="header-center-text">
            <span>Recommended Styles</span>
          </div>
          <div/>
        </div>
      </div>
      <div className="recommended-style-box">
        <div className="row">
          <div className="col col-12 p-0">
            <ProductsHorizontal itemWidth={145} productList={productList} />
          </div>
        </div>
      </div>
    </RecommendStylesRoot>
  )
}

const RecommendStylesRoot = styled.div`
  widht:100%;
  border-radius: 4px;
  .header-center-text {
    display: flex;
    text-align: center;
    column-gap: 4px;
    font-weight: 600;
    span {
      line-height: 15px;
    }
  }
  .recommend-header {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    font-weight: 400;
  }
  .recommended-style-box {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    .row {
      margin: auto;
      background: white;
    }
    .col {
      padding: 17px 0;
    }
  }
`;

RecommendStyles.propTypes = {}

export default RecommendStyles