import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import IconToggle from '../assets/icon-toggle.svg';

const UnitToggle = ({ on, off, name, value, onChange })  => {
  return (
    <SwitchLabel className="switch">
    <input type="checkbox" name={name} value={value} onChange={onChange} />
    <span className="slider">
      <div>
        <span className="toggle-on">{on}</span>
        <span>
          <IconToggle />
        </span>
        <span className="toggle-off">{off}</span>
      </div>
    </span>
  </SwitchLabel>
  )
}
const SwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 80px;
  height: 34px;

  & input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: white;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    .toggle-on {
      color: black;
    }
    .toggle-off {
      color: #ababab;
    }
    & > div {
      margin: 9px 16px;
    }
  }

  input:checked + .slider {
    .toggle-on {
      color: #ababab;
    }
    .toggle-off {
      color: black;
    }
    transition: 0.3s ease color;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }
`;
UnitToggle.propTypes = {}

export default UnitToggle