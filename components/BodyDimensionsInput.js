import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
const BodyDimensionsInput = ({
  value,
  min = 0,
  max = 0,
  name,
  onChange,
  onSubmit,
  errorMessage = 'Enter a number between',
  variant,
}) => {
  const inputRef = useRef();
  const [error, setError] = useState(false);
  const invalid = () => {
    const pattern_num = /[0-9]/;
    if (max > 0) {
      if (pattern_num.test(value) && value >= min && value <= max) {
        setError(false);
      } else {
        setError(true);
        return;
      }
    }
    onSubmit();
  };

  const onKeyPress = e => {
    if (e.key === 'Enter') {
      invalid();
    }
  };
  return (
    <>
      <Input
        ref={inputRef}
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        onBlur={invalid}
        onKeyPress={onKeyPress}
      />
      <InputErrorValidation>
        {error && (
          <span>
            {errorMessage} {min}~{max}
          </span>
        )}{' '}
      </InputErrorValidation>
    </>
  );
};
const Input = styled.input`
  width: 100%;
  background: #f1f1f1;
  border: 1px solid #e2e2e2;
  border-radius: 99999px;
  height: 100%;
  text-align: center;
  .input-error {
  }
`;
const InputErrorValidation = styled.div`
  color: red;
  position: absolute;
  bottom: -12px;
  left: 0;
  z-index: 10;
  /* max-width: 12rem; */
  padding: 0 0 0 20px;
`;
BodyDimensionsInput.propTypes = {};
export default BodyDimensionsInput;
