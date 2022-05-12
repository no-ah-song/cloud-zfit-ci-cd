import React, { useState } from 'react';
import styled from 'styled-components';
import { selectedProductState, colorAndSizeState } from '../recoil/state';
import { useRecoilValue, useRecoilState } from 'recoil';

const styleColor = {
  blue: '#006FD5',
  black: '#000000',
  brown: '#C88A54',
  burgandy: '#9F0707',
  gold: 'linear-gradient(180deg, #FCE071 0%, #D0A64A 100%)',
  green: '#6BC887',
  grey: '#CBCBCB',
  muticolour:
    'linear-gradient(36.03deg, #F569CE 8.42%, #B368F4 26.95%, #5F9DE6 46.73%, #79EA9B 63.85%, #FFF572 81.45%)',
  neutral: '#F7DBB1',
  orange: '#FFA34F',
  pink: '#EE88DE',
  purple: '#8640C4',
  red: '#F63C3C',
  silver: 'linear-gradient(180deg, #CFCFCF 0%, #898989 100%)',
  white: '#FFFFFF',
  yellow: '#FCEA72',
  navy: '#000080',
};

const ColorController = () => {
  const [active, setActive] = useState(false);
  const selectedProduct = useRecoilValue(selectedProductState); // selected product info state
  const [colorAndSize, setColorAndSize] = useRecoilState(colorAndSizeState);
  const handleClick = () => {
    setActive(!active);
  };
  const handleColorClick = color => {
    setColorAndSize({ ...colorAndSize, color: color }); // Set colorAndSize state
  };

  return (
    <ColorControllerRoot active={active}>
      <div>
        <button onClick={handleClick}>
          <ColorBadge color={colorAndSize.color} size="s" />
          <div>COLOR</div>
        </button>
      </div>
      <SelectArea active={active}>
        <SelectList>
          {selectedProduct.colors.map(item => {
            // selected product's colors
            return (
              <SelectItem active={colorAndSize.color === item.color}>
                <button onClick={() => handleColorClick(item.color)}>
                  <ColorBadge color={item.color} />
                </button>
              </SelectItem>
            );
          })}
        </SelectList>
      </SelectArea>
    </ColorControllerRoot>
  );
};

const ColorBadgeContainer = styled.span`
  background: ${props => styleColor[props.color?.toLowerCase()]};
  border: ${props => (props.color?.toLowerCase() === 'black')?'1px solid white;':'1px solid black;'}
  ${props => (props.size === 's' ? 'width: 12px; height:12px;' : 'width: 16px; height:16px;')}
  border-radius: 999px;
  display: inline-block;
  box-sizing: content-box;
`;
const ColorBadge = ({ color, size }) => {
  return <ColorBadgeContainer color={color} size={size} />;
};

const ColorControllerRoot = styled.div`
  z-index: 999;
  display: flex;
  flex-wrap: nowrap;
  button {
    width: 48px;
    height: 48px;
    border-radius: 4px;
    border: solid 1px black;
    background: white;
  }
`;

const SelectArea = styled.div`
  margin: 0 0 0 12px;
  overflow: hidden;
  display: ${props => (props.active ? 'block' : 'none')};
`;

const SelectList = styled.ul`
  display: flex;
  column-gap: 12px;
  overflow: scroll;
  padding-right: 32px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const SelectItem = styled.li`
  button {
    background: ${props => (props.active ? 'black' : 'white')};
    color: ${props => (props.active ? 'white' : 'black')};
  }
`;
ColorController.propTypes = {};

export default ColorController;
