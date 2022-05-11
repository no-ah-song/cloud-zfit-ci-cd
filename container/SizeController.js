import React, { useState } from 'react';
import styled from 'styled-components';
import { selectedProductState, colorAndSizeState } from '../recoil/state';
import { useRecoilValue, useRecoilState } from 'recoil';

const SizeController = () => {
  const [active, setActive] = useState(false);
  const selectedProduct = useRecoilValue(selectedProductState); // selected product info state
  const [colorAndSize, setColorAndSize] = useRecoilState(colorAndSizeState);
  const handleClick = () => {
    setActive(!active);
  };
  const handleSizeClick = size => {
    setColorAndSize({ ...colorAndSize, size: size }); // Set colorAndSize state
  };
  return (
    <SizeControllerRoot active={active}>
      <div>
        <button onClick={handleClick}>
          <b>{colorAndSize.size}</b>
          <div>SIZE</div>
        </button>
      </div>
      <SelectArea active={active}>
        <SelectList>
          {selectedProduct.colors.map(item => {
            // selected product's color
            if (item.color === colorAndSize.color) {
              return item.sizes.map(size => {
                return (
                  <SelectItem active={colorAndSize.size === size}>
                    <button onClick={() => handleSizeClick(size)}>{size}</button>
                  </SelectItem>
                );
              });
            }
          })}
        </SelectList>
      </SelectArea>
    </SizeControllerRoot>
  );
};
const SizeControllerRoot = styled.div`
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
SizeController.propTypes = {};

export default SizeController;
