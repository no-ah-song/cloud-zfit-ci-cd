import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UnitToggle from './UnitToggle';
import BodyDimensionsInput from './BodyDimensionsInput';
import {calcBodyDimensions} from '../utils/calcAdvanced';

import { avatarState, selectedProductState } from '../recoil/state';
import { useRecoilState, useRecoilValue } from 'recoil';

const FittingBasicTab = () => {
  const selectedProduct = useRecoilValue(selectedProductState);
  const [avatar, setAvatar] = useRecoilState(avatarState);

  const initialValues = {
    genders: selectedProduct.genders,
    height: 170,
    weight: 60,
    heightUnit: 'cm',
    weightUnit: 'kg',
  };
  
  const [values, setValues] = useState(initialValues);
  useEffect(()=>{
    setValueOfInput();
    setAvatar({...avatar, ...values, genders: selectedProduct.genders});
  },[selectedProduct]);

  const setValueOfGenders = useCallback(
    event => {
      // gender change
      const { checked } = event.target;
      let genders = [];
      if (checked) {
        genders.push('women');
      } else {
        genders.push('men');
      }
      setValues({
        ...values,
        genders: genders,
      });
      setAvatar({
        ...avatar,
        genders: genders,
        // height:values.heightUnit === "in"? Math.round(values.height*2.54):values.height,
        // weight:values.weight,
      });
    },
    [values, avatar]
  );

  const handleChangeGenderToggle = useCallback(
    event => {
      setValueOfGenders(event);
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
      convert = Math.round((value / 2.54 / 12) * 10) / 10;
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

  const handleChangeWeightToggle = useCallback(event => {
    // height unit change
    const { name, value, checked } = event.target;
    const unitName = `${name}Unit`;
    let convert = 0;
    let unit = '';
    if (checked) {
      // kg to lbs
      convert = Math.round(value * 2.2046);
      unit = 'lb';
    } else {
      // lbs to kg
      convert = Math.round(value / 2.2046);
      unit = 'kg';
    }
    setValues({
      ...values,
      [name]: convert,
      [unitName]: unit,
    });
  }, [values]);

  const handleChangeInput = event => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const setValueOfInput = useCallback(() => {
    const height = values.heightUnit === 'in' ? Math.round(values.height * 2.54 *12) : values.height;
    const advancedBody = calcBodyDimensions({basedHeight:height, selectedShape:avatar.bodyShape, values:avatar});
    setAvatar({
      ...avatar,
      height: height,
      weight: values.weight,
      hip: advancedBody.hip,
      armLength: advancedBody.armLength,
      inseam: advancedBody.inseam,
      neck: advancedBody.neck,
      chest: advancedBody.chest,
      waist: advancedBody.waist,
      belt: advancedBody.belt,
      acrossShoulder: advancedBody.shoulder,
    });
  }, [values, avatar]);

  const handleSubmit = useCallback(
    event => {
      event?.preventDefault();
      setValueOfInput();
    },
    [values, avatar]
  );

  return (
    <TabRows className="list-group list-group-flush">
      <li className="list-group-item">
        <div className="row">
          <div className="col col-4 col-header">Gender</div>
          <div className="col col-8">
            <GenderToggle className={values.genders.length>1?"multiple-gender":"disabled-other-gender"}>
              <input type="checkbox" name="gender_type" id="gender_type" onChange={handleChangeGenderToggle} disabled={avatar.genders.length>1?false:true} checked={avatar.genders[0]==="men"?false:true}/>
              <label for="gender_type" data-on="women" data-off="men" className="btn-gender-type"></label>
            </GenderToggle>
          </div>
        </div>
      </li>
      <li className="list-group-item">
        <div className="row">
          <div className="col col-4 col-header">Height</div>
          <div className="col col-4">
            <BodyDimensionsInput
              value={values.height}
              name="height"
              min={values.heightUnit === 'cm' ? (values.genders[0] === 'men' ? 150 : 140) : (values.genders[0] === 'men' ? 59 : 55) }
              max={values.heightUnit === 'cm' ? (values.genders[0] === 'men' ? 230 : 205) : (values.genders[0] === 'men' ? 90 : 80)}
              onChange={handleChangeInput}
              onSubmit={handleSubmit}
            />
          </div>
          <div className="col col-4">
            <UnitToggle
              on={'cm'}
              off={'in'}
              onChange={handleChangeLengthToggle}
              name={'height'}
              value={values.height}
            />
          </div>
        </div>
      </li>
      <li className="list-group-item">
        <div className="row">
          <div className="col col-4 col-header">Weight</div>
          <div className="col col-4">
            <BodyDimensionsInput
              value={values.weight}
              name="weight"
              min={values.genders[0] === 'men' ? 50 : 40}
              max={values.genders[0] === 'men' ? 100 : 100}
              onChange={handleChangeInput}
              onSubmit={handleSubmit}
            />
          </div>
          <div className="col col-4">
            <UnitToggle
              on={'kg'}
              off={'lb'}
              onChange={handleChangeWeightToggle}
              name={'weight'}
              value={values.weight}
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

  &.disabled-other-gender{
    disabled:true;

  }
`;

FittingBasicTab.propTypes = {};

export default FittingBasicTab;
