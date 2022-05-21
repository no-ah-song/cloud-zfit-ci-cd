import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import styled from 'styled-components';

import { fittingImagesState, selectedProductState } from '../recoil/state';
import { useRecoilValue } from 'recoil';

const image_size = 16;

const FittingViewer = ({}) => {
  const fittingImages = useRecoilValue(fittingImagesState);
  const selectedProduct = useRecoilValue(selectedProductState);
  const brand_name = selectedProduct.brandPath;
  const prod_name = selectedProduct.productName;
  // HACK for avatar
  const prod_type =
    selectedProduct.type === 'underwear' ? (fittingImages.gender === 'men' ? 'man' : 'woman') : selectedProduct.type;
  const prefixImage = `https://d18kvmn6ewgco5.cloudfront.net/pre-render/${brand_name}/${
    fittingImages.gender === 'men' ? 'm' : 'f'
  }/${prod_type}/${prod_name}/${fittingImages.size}/${fittingImages.color}/${fittingImages.height}_${
    fittingImages.armLength * 10
  }_${fittingImages.belt * 10}_${fittingImages.chest * 10}_${fittingImages.inseam * 10}_${fittingImages.hip * 10}_${
    fittingImages.neck * 10
  }_${fittingImages.acrossShoulder * 10}_${fittingImages.waist * 10}`;
  const imagesDefault = [];
  const imagesBrand = [];

  for (let index = 0; index < image_size; index++) {
    imagesDefault.push(`${prefixImage}/${index.toString().padStart(3, '0')}.jpg`);
    imagesBrand.push(`${prefixImage}/brand/${index.toString().padStart(3, '0')}.jpg`);
  }

  return (
    <>
      <FittingSlider captures={[imagesDefault, imagesBrand]} fitmap={fittingImages.fitmap} />
    </>
  );
};

const FittingSlider = ({ captures, fitmap, bg_index = 0 }) => {
  // TODO select bg_index, check captures length
  const capture = captures.at(bg_index);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [delta, setDelta] = useState(0);
  const validCapture = capture && Array.isArray(capture) && capture.length > 0;
  const deltaDiff = 5;
  const configswipeable = {
    delta: 10, // min distance(px) before a swipe starts
    preventDefaultTouchmoveEvent: false, // call e.preventDefault *See Details*
    trackTouch: true, // track touch input
    trackMouse: true, // track mouse input
    rotationAngle: 0, // set a rotation angle
  };
  useEffect(() => {
    if (fitmap) {
      setCurrentIndex(capture.length / 2);
    } else {
      setCurrentIndex(0);
    }
  }, [fitmap]);
  const handlers = useSwipeable({
    onSwiped: eventData => {
      setDelta(0);
    },
    onSwiping: eventData => {
      if (validCapture) {
        const diff = delta - eventData.deltaX;
        if (Math.abs(diff) > deltaDiff) {
          let start;
          let end;
          if (fitmap) {
            start = capture.length / 2;
            end = capture.length - 1;
          } else {
            start = 0;
            end = capture.length / 2 - 1;
          }
          let index = currentIndex + (diff > 0 ? -1 : 1);

          if (index < start) {
            index = end;
          } else if (index > end) {
            index = start;
          }
          setCurrentIndex(index);
          setDelta(eventData.deltaX);
        }
      }
    },
    ...configswipeable,
  });

  return (
    <>
      <Slider {...handlers}></Slider>
      {capture?.map((src, index) => {
        return (
          <SlideImage key={index} className={currentIndex === index ? 'd-block' : 'd-none'}>
            <img
              src={src}
              onError={e => {
                e.target.src = '/images/z-fit.png'; // TODO relace default image(url must always valid)
              }}></img>
          </SlideImage>
        );
      })}
    </>
  );
};

const Slider = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 990;
`;
const SlideImage = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  .unactive {
    display: none;
  }
  .active {
    display: block;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
FittingViewer.propTypes = {};

export default React.memo(FittingViewer);
