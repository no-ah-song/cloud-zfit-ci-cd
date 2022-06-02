import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fitmapState } from '../recoil/state';
import { useRecoilState, useResetRecoilState } from 'recoil';
import Image from 'next/image';

const FitmapController = () => {
  const [active, setActive] = useState(false);
  const [fitmap, setFitmap] = useRecoilState(fitmapState);
  const resetFitmap = useResetRecoilState(fitmapState);

  useEffect(() => {
    return function cleanup() {
      // fitmap state cleanup
      resetFitmap;
    };
  }, []);

  const handleFitmapClick = () => {
    setActive(!active);
    setFitmap({ fitmap: !fitmap.fitmap });
  };
  return (
    <FitmapControllerRoot active={active}>
      {active && (
        <FitmapIndicator>
          <Image src="/images/Fitmap Indicator.png" width={64} height={120}></Image>
        </FitmapIndicator>
      )}
      <button onClick={handleFitmapClick}>
        FIT
        <br />
        MAP
      </button>
    </FitmapControllerRoot>
  );
};

const FitmapControllerRoot = styled.div`
  z-index: 999;
  button {
    width: 48px;
    height: 48px;
    border-radius: 4px;
    border: solid 1px black;
    background: ${props => (props.active ? 'black' : 'white')};
    color: ${props => (props.active ? 'white' : 'black')};
  }
`;

const FitmapIndicator = styled.div`
  position: fixed;
  top: 50%;
`;
FitmapController.propTypes = {};

export default FitmapController;
