import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { selectedProductState, colorAndSizeState } from '../recoil/state';
import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil';

const SizeController = () => {
  const [active, setActive] = useState(false);
  const selectedProduct = useRecoilValue(selectedProductState); // selected product info state
  const [colorAndSize, setColorAndSize] = useRecoilState(colorAndSizeState);
  const resetColorAndSize = useResetRecoilState(colorAndSizeState);

  useEffect(() => {
    return function cleanup() {
      // fitmap state cleanup
      setActive(false);
      resetColorAndSize();
    };
  }, []);

  useEffect(() => {
    selectedProduct.colors.map(item => {
      // selected product's color
      if (item.color === colorAndSize.color) {
        setColorAndSize({ ...colorAndSize, size: item.sizes[0] });
      }
    });
  }, [colorAndSize.color]);

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
    color: black;
  }
`;

const SelectArea = styled.div`
  margin: 0 0 0 16px;
  overflow: hidden;
  display: ${props => (props.active ? 'block' : 'none')};
`;

const SelectList = styled.ul`
  display: flex;
  column-gap: 8px;
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
