import React, { useEffect, useState, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Image from 'next/image';

import { fittingImagesState } from '../recoil/state';
import { useRecoilValue } from 'recoil';

const FittingViewer = ({}) => {
  const fittingImages = useRecoilValue(fittingImagesState);
  const [fitmap, setFitmap] = useState();
  const [imageArray, setImageArray] = useState();
  useEffect(() => {
    setImageArray(fittingImages.images);
    setFitmap(fittingImages.fitmap);
  }, [fittingImages]);
  useEffect(() => {}, [imageArray]);
  return (
    <>
      <FittingSlider capture={imageArray} fitmap={fitmap} />
    </>
  );
};

const FittingSlider = ({ capture, fitmap }) => {
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
            <img src={src}></img>
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
