import React, {useState,useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Image from 'next/image';
import { avatarState } from '../recoil/state';
import { useRecoilState, useRecoilValue } from 'recoil';
import {calcBodyDimensions} from '../utils/calcAdvanced';

const FittingShapeTab = props => {
  const [selectedShape, setSelectedShape] = useState(0);
  const [avatar, setAvatar] = useRecoilState(avatarState);
  
  const handleClickShape = useCallback((event)=>{
    setSelectedShape(Number(event.target.dataset.targetIndex));
    setAvatar({...avatar, bodyShape:Number(event.target.dataset.targetIndex)})
  },[selectedShape]);

  useEffect(()=>{
    let avatarHeight = avatar.height;
    const advancedBody = calcBodyDimensions({basedHeight:avatarHeight, selectedShape:selectedShape, values:avatar});
    setAvatar({
      ...avatar,
      hip: advancedBody.hip,
      armLength: advancedBody.armLength,
      inseam: advancedBody.inseam,
      neck: advancedBody.neck,
      chest: advancedBody.chest,
      waist: advancedBody.waist,
      belt: advancedBody.belt,
      acrossShoulder: advancedBody.shoulder,
    });
  }, [selectedShape]);

  return (
    <TabRows className="list-group list-group-flush">
      <li className="list-group-item">
        <div className="row">
          {avatar.genders[0] === 'women' ? (
            <ShapeGrid role="button" onClick={handleClickShape}>
              <div className={selectedShape === 0 ? 'active' : ''}>
                <Image src="/images/women_hourglass.jpg" width={61} height={160} data-target-index={0}></Image>
              </div>
              <div className={selectedShape === 1 ? 'active' : ''}>
                <Image src="/images/women_pear.jpg" width={61} height={160} data-target-index={1}></Image>
              </div>
              <div className={selectedShape === 2 ? 'active' : ''}>
                <Image src="/images/women_rectangle.jpg" width={61} height={160} data-target-index={2}></Image>
              </div>
              <div className={selectedShape === 3 ? 'active' : ''}>
                <Image src="/images/women_inverted_triangle.jpg" width={61} height={160} data-target-index={3}></Image>
              </div>
              <div className={selectedShape === 4 ? 'active' : ''}>
                <Image src="/images/women_apple.jpg" width={61} height={160} data-target-index={4}></Image>
              </div>
            </ShapeGrid>
          ) : (
            <ShapeGrid role="button" onClick={handleClickShape}>
              <div className={selectedShape === 0 ? 'active' : ''}>
                <Image src="/images/men_trapezoid.jpg" width={61} height={160} data-target-index = {0}></Image>
              </div>
              <div className={selectedShape === 1 ? 'active' : ''}>
                <Image src="/images/men_triangle.jpg" width={61} height={160} data-target-index = {1}></Image>
              </div>
              <div className={selectedShape === 2 ? 'active' : ''}>
                <Image src="/images/men_rectangle.jpg" width={61} height={160} data-target-index = {2}></Image>
              </div>
              <div className={selectedShape === 3 ? 'active' : ''}>
                <Image src="/images/men_inverted_triangle.jpg" width={61} height={160} data-target-index = {3}></Image>
              </div>
              <div className={selectedShape === 4 ? 'active' : ''}>
                <Image src="/images/men_Oval.jpg" width={61} height={160} data-target-index = {4}></Image>
              </div>
            </ShapeGrid>
          )}
        </div>
      </li>
    </TabRows>
  );
};

const TabRows = styled.ul`
  li {
    border: 0;
    padding-top: 24px;
  }
`;

const ShapeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  & > div {
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
`
FittingShapeTab.propTypes = {};

export default FittingShapeTab;
