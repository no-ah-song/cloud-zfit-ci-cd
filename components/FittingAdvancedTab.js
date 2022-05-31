import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UnitToggle from './UnitToggle';
import BodyDimensionsInput from './BodyDimensionsInput';

import { avatarState } from '../recoil/state';
import { useRecoilState } from 'recoil';

const FittingAdvancedTab = props => {
  const [avatar, setAvatar] = useRecoilState(avatarState);

  const initialValues = {
    hip: 90,
    armLength: 60,
    inseam: 75,
    hipUnit: 'cm',
    armLengthUnit: 'cm',
    inseamUnit: 'cm',
  };

  const [values, setValues] = useState(initialValues);

  useEffect(()=>{
    setValues({
      ...values,
      hip: avatar.hip,
      armLength: avatar.armLength,
      inseam:avatar.inseam
    })
  },[avatar.hip, avatar.armLength, avatar.inseam]);

  const handleChangeInput = event => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const setValueOfInput = useCallback(() => {
    setAvatar({
      ...avatar,
      hip: values.hipUnit === 'in' ? Math.round(values.hip * 2.54*12) : values.hip,
      armLength: values.armLengthUnit === 'in' ? Math.round(values.armLength * 2.54*12) : values.armLength,
      inseam: values.inseamUnit === 'in' ? Math.round(values.inseam * 2.54*12) : values.inseam,
    });
  }, [values, avatar]);

  const handleSubmit = useCallback(
    event => {
      event?.preventDefault();
      setValueOfInput();
    },
    [values, avatar]
  );

  const handleChangeLengthToggle = useCallback(event => {
    // height unit change
    const { name, value, checked } = event.target;
    const unitName = `${name}Unit`;
    let convert = 0;
    let unit = '';
    if (checked) {
      // cm to in
      convert = Math.round((value / 2.54/ 12) * 10 ) / 10;
      unit = 'in';
    } else {
      // in to cm
      convert = Math.round(value * 2.54 * 12);
      unit = 'cm';
    }
    setValues({
      ...values,
      [name]: convert,
      [unitName]: unit,
    });
    setAvatar({
      ...avatar,
      [unitName]: unit,
    });
  }, [values, avatar]);

  return (
    <TabRows className="list-group list-group-flush">
      <li className="list-group-item">
        <div className="row">
          <div className="col col-4 col-header">Hip</div>
          <div className="col col-4">
            <BodyDimensionsInput
              value={values.hip}
              name="hip"
              min={values.hipUnit === 'cm' ? (avatar.genders[0] === 'men' ? 85 : 80) : (avatar.genders[0] === 'men' ? 2.8 : 2.6) }
              max={values.hipUnit === 'cm' ? (avatar.genders[0] === 'men' ? 120 : 125) : (avatar.genders[0] === 'men' ? 4 : 4)}
              onChange={handleChangeInput}
              onSubmit={handleSubmit}
            />
          </div>
          <div className="col col-4">
            <UnitToggle on={'cm'} off={'in'} onChange={handleChangeLengthToggle} name={'hip'} value={values.hip} />
          </div>
        </div>
      </li>
      <li className="list-group-item">
        <div className="row">
          <div className="col col-4 col-header">Arm Length</div>
          <div className="col col-4">
            <BodyDimensionsInput
              value={values.armLength}
              name="armLength"
              min={values.armLengthUnit === 'cm' ? (avatar.genders[0] === 'men' ? 43 : 41) : (avatar.genders[0] === 'men' ? 1.4 : 1.4) }
              max={values.armLengthUnit === 'cm' ? (avatar.genders[0] === 'men' ? 81 : 72) : (avatar.genders[0] === 'men' ? 2.6 : 2.3)}
              onChange={handleChangeInput}
              onSubmit={handleSubmit}
            />
          </div>
          <div className="col col-4">
            <UnitToggle
              on={'cm'}
              off={'in'}
              onChange={handleChangeLengthToggle}
              name={'armLength'}
              value={values.armLength}
            />
          </div>
        </div>
      </li>
      <li className="list-group-item">
        <div className="row">
          <div className="col col-4 col-header">Inseam</div>
          <div className="col col-4">
            <BodyDimensionsInput
              value={values.inseam}
              name="inseam"
              min={values.inseamUnit === 'cm' ? (avatar.genders[0] === 'men' ? 61 : 59) : (avatar.genders[0] === 'men' ? 2 : 2) }
              max={values.inseamUnit === 'cm' ? (avatar.genders[0] === 'men' ? 118 : 109) : (avatar.genders[0] === 'men' ? 3.8 : 3.6)}
              onChange={handleChangeInput}
              onSubmit={handleSubmit}
            />
          </div>
          <div className="col col-4">
            <UnitToggle
              on={'cm'}
              off={'in'}
              onChange={handleChangeLengthToggle}
              name={'inseam'}
              value={values.inseam}
            />
          </div>
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
const GenderToggle = styled.label`
  position: relative;
  display: inline-block;
  width: 100%;

  & input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .btn-gender-type {
    margin: 0px;
    width: 100%;
    height: 30px;
    background: #e2e2e2;
    border-radius: 26px;
    overflow: hidden;
    position: relative;
    transition: all 0.3s ease;
    cursor: pointer;
    display: block;
    transition: 0.4s;
  }
  label.btn-gender-type:before {
    content: attr(data-on);
    position: absolute;
    font-size: 12px;
    font-weight: 500;
    right: 0px;
    text-align: center;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 9px 0;
  }
  label.btn-gender-type:after {
    content: attr(data-off);
    width: 50%;
    height: 16px;
    background: black;
    color: white;
    border-radius: 26px;
    position: absolute;
    left: 2px;
    right: unset;
    text-align: center;
    transition: all 0.3s ease;
    box-shadow: 0px 0px 6px -2px #111;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 9px 0;
  }
  input:checked + label.btn-gender-type:after {
    content: attr(data-on);
    left: 50%;
  }
  input:checked + label.btn-gender-type:before {
    content: attr(data-off);
    left: 2px;
  }
`;

FittingAdvancedTab.propTypes = {};

export default FittingAdvancedTab;
