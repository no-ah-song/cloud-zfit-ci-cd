import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import ProductsHorizontal from '../components/ProductsHorizontal';
import IconToggle from '../assets/icon-toggle.svg';

import { avatarState, useSsrComplectedState, selectedProductState } from '../recoil/state';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { values } from 'lodash';

const StyleController = ({ isOpen }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [isOpen]);

  return (
    <>
      <StyleControlBox className={activeIndex === 0 ? 'style-control-box active' : 'style-control-box'}>
        <BodyInfoBox />
      </StyleControlBox>
    </>
  );
};

const StyleControlBox = ({ title, children, ...rest }) => {
  const setSsrCompleted = useSsrComplectedState();
  const [isOpen, setIsOpen] = useState(true);
  useEffect(setSsrCompleted, [setSsrCompleted]);

  return (
    <div>
      <StyledControlContainer {...rest}>
        <ControlHeader onClick={() => setIsOpen(!isOpen)} role="button">
          {isOpen ? (
            <div>COLLAPSE ↓</div>
          ) : (
            <div className="row">
              <div className="col col-12 d-flex">
                <span className="text-start w-100 px-4 text-nowrap">
                  <b>View Style & Body</b>
                </span>
                <span className="text-end px-4 text-nowrap">EXPAND ↑</span>
              </div>
            </div>
          )}
        </ControlHeader>
        <ControllBody className={!isOpen && 'style-body-close'}>{children}</ControllBody>
      </StyledControlContainer>
    </div>
  );
};

const StyledControlContainer = styled.div`
  background: white;
  border-left: solid 1px black;
  border-bottom: solid 1px black;
  border-radius: 4px 4px 0px 0px;
  display: none;
  &.active {
    display: block;
  }
  .style-body-close {
    display: none;
  }
`;

const BodyInfoBox = () => {
  const [avatar, setAvatar] = useRecoilState(avatarState);
  const selectedProduct = useRecoilValue(selectedProductState);
  const [selectedShape, setSelectedShape] = useState(0);

  useEffect(() => {
    setValues({
      ...values,
      ['genders']: selectedProduct.genders,
    });
    setAvatar({
      ...values,
      ['genders']: selectedProduct.genders,
    });
  }, [selectedProduct]);

  const initialValues = {
    genders: selectedProduct.genders,
    height: 170,
    weight: 60,
    hip: 90,
    armLength: 60,
    inseam: 75,
    neck: 0,
    chest: 0,
    belt: 0,
    acrossShoulder: 0,
    heightUnit:"cm",
    hipUnit:"cm",
    armLengthUnit:"cm",
    inseamUnit: "cm",
  };
  const [values, setValues] = useState(initialValues);

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === 'height') {
      // 신장 입력 시점만 advance 자동 계산
      const advancedBody = calcBodyDimention({selectedShape:selectedShape, values:values});
      setValues({
        ...values,
        hip: advancedBody.hip,
        armLength: advancedBody.armLength,
        inseam: advancedBody.inseam,
        neck: advancedBody.neck,
        chest: advancedBody.chest,
        waist: advancedBody.waist,
        belt: advancedBody.belt,
        acrossShoulder: advancedBody.shoulder,
        [name]: value,
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  }; // shape

  const changeGender = (targetName, targetValue) => {
    const advancedBody = calcBodyDimention({selectedShape:selectedShape, genders:targetValue, values:values});
    setValues({
      ...values,
      hip: advancedBody.hip,
      armLength: advancedBody.armLength,
      inseam: advancedBody.inseam,
      neck: advancedBody.neck,
      chest: advancedBody.chest,
      waist: advancedBody.waist,
      belt: advancedBody.belt,
      acrossShoulder: advancedBody.shoulder,
      [targetName]: targetValue,
    });
    setAvatar({
      ...values,
      hip: advancedBody.hip,
      armLength: advancedBody.armLength,
      inseam: advancedBody.inseam,
      neck: advancedBody.neck,
      chest: advancedBody.chest,
      waist: advancedBody.waist,
      belt: advancedBody.belt,
      acrossShoulder: advancedBody.shoulder,
      [targetName]: targetValue,
    });
  };

  const handleSubmit = useCallback(
    e => {
      e?.preventDefault();
      setAvatar({
        ...values,
        height:values.heightUnit === "in"? Math.round(values.height*2.54):values.height,
        hip:values.hipUnit === "in"? Math.round(values.hip*2.54):values.hip,
      });
    },
    [values]
  );

  useEffect(() => {
    updateBodyDimention();
  }, [selectedShape]); //shape 데이터 변경

  const updateBodyDimention = useCallback(() => {
    const advancedBody = calcBodyDimention({selectedShape:selectedShape, values:values});
    setValues({
      ...values,
      hip: advancedBody.hip,
      armLength: advancedBody.armLength,
      inseam: advancedBody.inseam,
      neck: advancedBody.neck,
      chest: advancedBody.chest,
      waist: advancedBody.waist,
      belt: advancedBody.belt,
      acrossShoulder: advancedBody.shoulder,
    });
    setAvatar({
      ...values,
      hip: advancedBody.hip,
      armLength: advancedBody.armLength,
      inseam: advancedBody.inseam,
      neck: advancedBody.neck,
      chest: advancedBody.chest,
      waist: advancedBody.waist,
      belt: advancedBody.belt,
      acrossShoulder: advancedBody.shoulder,
    });
  }, [values, selectedShape]);

  const handleChangeLengthToggle = useCallback(event => {
    const { name, value, checked } = event.target;
    const unitName = `${name}Unit`;
    let convert = 0;
    let unit = "";
    if(checked){ // cm to in 
      convert = Math.round(value/2.54*10)/10;
      unit="in"
    }else{ // in to cm
      convert = Math.round(value*2.54);
      unit="cm"
    }
    setValues({
      ...values,
      [name]: convert,
      [unitName]: unit
    });
  }, []);

  const handleChangeWeightToggle = useCallback(event => {
    const { checked } = event.target;
    if(checked){
      
    }
  }, []);

  return (
    <div className="body-info-box">
      <div className="row w-100">
        <div className="col col-6 px-4">Gender</div>
        {selectedProduct.genders.length > 1 ? (
          <>
            <div
              className={values.genders[0] === 'men' ? 'col col-3 toggle-active' : 'col col-3 toggle'}
              onClick={() => changeGender('genders', ['men', 'women'])}
              data-toggle-group="gender"
              data-value="men"
              role="button">
              Men
            </div>
            <div
              className={values.genders[0] === 'women' ? 'col col-3 toggle-active' : 'col col-3 toggle'}
              onClick={() => changeGender('genders', ['women', 'men'])}
              data-toggle-group="gender"
              data-value="women"
              role="button">
              Women
            </div>
          </>
        ) : values.genders[0] === 'men' ? (
          <div
            className="col col-6 toggle-active"
            onClick={() => changeGender('genders', ['men'])}
            data-toggle-group="gender"
            data-value="men"
            role="button">
            Men
          </div>
        ) : (
          <div
            className="col col-6 toggle-active"
            onClick={() => changeGender(e, 'genders', ['women'])}
            data-toggle-group="gender"
            data-value="women"
            role="button">
            Women
          </div>
        )}
      </div>
      <div className="row w-100">
        <div className="col col-3 px-4">Height</div>
        <div className="col col-6">
          <BodyDimensionsInput
            value={values.height}
            name="height"
            min={values.heightUnit === "cm" ? (values.genders[0] === 'men' ? 150 : 140) : 0}
            max={values.heightUnit === "cm" ? (values.genders[0] === 'men' ? 230 : 205) : 200}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
        <div className="col-3 d-flex p-0">
          <ToggleButton on="cm" off="in" value={values.height} name="height" onChange={handleChangeLengthToggle}/>
        </div>
      </div>
      <div className="row w-100">
        <div className="col col-3 px-4">Weight</div>
        <div className="col col-6">
          <BodyDimensionsInput
            value={values.weight}
            name="weight"
            min={values.genders[0] === 'men' ? 50 : 40}
            max={values.genders[0] === 'men' ? 100 : 100}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
        <div className="col-3 d-flex p-0">

        </div>
      </div>
      <div className="row">
        <div className="col col-12">Shape</div>
      </div>
      <div className="row">
        {values.genders[0] === 'women' ? (
          <div className="shape-grid" role="button">
            <div onClick={() => setSelectedShape(0)} className={selectedShape === 0 ? 'active' : ''}>
              <Image src="/images/women_hourglass.png" width={71} height={96}></Image>
            </div>
            <div onClick={() => setSelectedShape(1)} className={selectedShape === 1 ? 'active' : ''}>
              <Image src="/images/women_pear.png" width={71} height={96}></Image>
            </div>
            <div onClick={() => setSelectedShape(2)} className={selectedShape === 2 ? 'active' : ''}>
              <Image src="/images/women_rectangle.png" width={71} height={96}></Image>
            </div>
            <div onClick={() => setSelectedShape(3)} className={selectedShape === 3 ? 'active' : ''}>
              <Image src="/images/women_inverted_triangle.png" width={71} height={96}></Image>
            </div>
            <div onClick={() => setSelectedShape(4)} className={selectedShape === 4 ? 'active' : ''}>
              <Image src="/images/women_apple.png" width={71} height={96}></Image>
            </div>
          </div>
        ) : (
          <div className="shape-grid" role="button">
            <div onClick={() => setSelectedShape(0)} className={selectedShape === 0 ? 'active' : ''}>
              <Image src="/images/men_trapezoid.png" width={71} height={96}></Image>
            </div>
            <div onClick={() => setSelectedShape(1)} className={selectedShape === 1 ? 'active' : ''}>
              <Image src="/images/men_triangle.png" width={71} height={96}></Image>
            </div>
            <div onClick={() => setSelectedShape(2)} className={selectedShape === 2 ? 'active' : ''}>
              <Image src="/images/men_rectangle.png" width={71} height={96}></Image>
            </div>
            <div onClick={() => setSelectedShape(3)} className={selectedShape === 3 ? 'active' : ''}>
              <Image src="/images/men_inverted_triangle.png" width={71} height={96}></Image>
            </div>
            <div onClick={() => setSelectedShape(4)} className={selectedShape === 4 ? 'active' : ''}>
              <Image src="/images/men_Oval.png" width={71} height={96}></Image>
            </div>
          </div>
        )}
      </div>
      <div className="row">
        <div className="col col-12">Advanced</div>
      </div>
      <div className="row w-100">
        <div className="col col-3 px-4">Hip</div>
        <div className="col col-6">
          <BodyDimensionsInput value={values.hip} name="hip" onChange={handleChange} onSubmit={handleSubmit} />
        </div>
        <div className="col-3 d-flex p-0">
          <div className="col col-12 toggle-active hip-unit" data-toggle-group="hip-unit" onClick={handleChangeLengthToggle}>
            cm
          </div>
        </div>
      </div>
      <div className="row w-100">
        <div className="col col-3 px-4 text-nowrap">Arm Length</div>
        <div className="col col-6">
          <BodyDimensionsInput
            value={values.armLength}
            name="armLength"
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
        <div className="col-3 d-flex p-0">

        </div>
      </div>
      <div className="row w-100">
        <div className="col col-3 px-4">Inseam</div>
        <div className="col col-6">
          <BodyDimensionsInput value={values.inseam} name="inseam" onChange={handleChange} onSubmit={handleSubmit} />
        </div>
        <div className="col-3 d-flex p-0">

        </div>
      </div>
    </div>
  );
};

const RecommendedStyleBox = ({ onDone }) => {
  const [fitting, setFitting] = useRecoilState(selectedProductState);

  return (
    <div className="recommended-style-box">
      <div className="row">
        <div className="col col-12 d-flex">
          <span className="text-start w-100 px-4" onClick={onDone} role="button">
            <b>← Back</b>
          </span>
          <span className="text-end w-100 px-4">Recommended Styles</span>
        </div>
      </div>
      <div className="row">
        <div className="col col-12 p-0">
          <ProductsHorizontal itemWidth={145} productList={[fitting, fitting, fitting]} />
        </div>
      </div>
    </div>
  );
};

function BodyDimensionsInput({
  value,
  min = 0,
  max = 0,
  name,
  onChange,
  onSubmit,
  errorMessage = 'Enter a number between',
  variant,
}) {
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
      <input
        ref={inputRef}
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        onBlur={invalid}
        onKeyPress={onKeyPress}
      />
      <div>
        {error && (
          <span className="input-error">
            {errorMessage} {min}~{max}
          </span>
        )}{' '}
      </div>
    </>
  );
}
function calcBodyDimention({selectedShape, genders = [], values}) {
  let height = Number(document.getElementsByName('height')[0].value);
  if(values.heightUnit === "in"){ // convert height unit in to cm
    height = Math.round(height*2.54);
  }
  if (genders[0] === 'women') {
    const baseSize = {
      neck: height * 0.251,
      chest: height * 0.541,
      waist: height * 0.451,
      belt: height * 0.463,
      hip: height * 0.542,
      shoulder: height * 1.25,
      armLength: height * 0.338,
      inseam: height * 0.434,
    };
    let customSize = {
      neck: baseSize.neck,
      chest: baseSize.chest,
      waist: baseSize.waist,
      belt: baseSize.belt,
      hip: baseSize.hip,
      shoulder: baseSize.shoulder,
      armLength: baseSize.armLength,
      inseam: baseSize.inseam,
    };
    switch (selectedShape) {
      case 0: //hourglass
        customSize = {
          neck: baseSize.neck,
          chest: baseSize.chest,
          waist: baseSize.waist,
          belt: baseSize.belt,
          hip: baseSize.hip,
          shoulder: baseSize.shoulder,
          armLength: baseSize.armLength,
          inseam: baseSize.inseam,
        };
        break;
      case 1: //pear
        customSize = {
          neck: baseSize.neck - 6,
          chest: baseSize.chest - 11.6,
          waist: baseSize.waist + 5.5,
          belt: baseSize.belt + 7.5,
          hip: baseSize.hip + 8.9,
          shoulder: baseSize.shoulder - 0.6,
          armLength: baseSize.armLength - 1,
          inseam: baseSize.inseam + 0.8,
        };
        break;
      case 2: //rectanggle
        customSize = {
          neck: baseSize.neck - 3,
          chest: baseSize.chest - 2.8,
          waist: baseSize.waist - 8.3,
          belt: baseSize.belt - 6.9,
          hip: baseSize.hip - 7.7,
          shoulder: baseSize.shoulder - 1,
          armLength: baseSize.armLength - 0.5,
          inseam: baseSize.inseam - 0.6,
        };
        break;
      case 3: //inverted triangle
        customSize = {
          neck: baseSize.neck + 3,
          chest: baseSize.chest + 3.1,
          waist: baseSize.waist + 3.5,
          belt: baseSize.belt - 4.9,
          hip: baseSize.hip - 5.5,
          shoulder: baseSize.shoulder + 2.5,
          armLength: baseSize.armLength + 0.5,
          inseam: baseSize.inseam + 0.2,
        };
        break;
      case 4: //apple
        customSize = {
          neck: baseSize.neck + 6,
          chest: baseSize.chest + 12.6,
          waist: baseSize.waist + 22,
          belt: baseSize.belt + 17.9,
          hip: baseSize.hip + 13.8,
          shoulder: baseSize.shoulder + 1.5,
          armLength: baseSize.armLength + 1,
          inseam: baseSize.inseam - 2.3,
        };
        break;
    }
    customSize = {
      neck: Math.round(customSize.neck),
      chest: Math.round(customSize.chest),
      waist: Math.round(customSize.waist),
      belt: Math.round(customSize.belt),
      hip: values.hipUnit === "in"? Math.round(customSize.hip/2.54*10)/10:Math.round(customSize.hip),
      shoulder: Math.round(customSize.shoulder),
      armLength: values.armLengthUnit === "in" ? Math.round(customSize.armLength/2.54*10)/10:Math.round(customSize.armLength),
      inseam: values.inseamUnit === "in"? Math.round(customSize.inseam/2.54*10)/10:Math.round(customSize.inseam)
    };
    return customSize;
  } else {
    const baseSize = {
      neck: height * 0.251,
      chest: height * 0.541,
      waist: height * 0.451,
      belt: height * 0.463,
      hip: height * 0.542,
      shoulder: height * 1.25,
      armLength: height * 0.338,
      inseam: height * 0.434,
    };
    let customSize = {
      neck: baseSize.neck,
      chest: baseSize.chest,
      waist: baseSize.waist,
      belt: baseSize.belt,
      hip: baseSize.hip,
      shoulder: baseSize.shoulder,
      armLength: baseSize.armLength,
      inseam: baseSize.inseam,
    };
    switch (selectedShape) {
      case 0: //trapezoid
        customSize = {
          neck: baseSize.neck,
          chest: baseSize.chest,
          waist: baseSize.waist,
          belt: baseSize.belt,
          hip: baseSize.hip,
          shoulder: baseSize.shoulder,
          armLength: baseSize.armLength,
          inseam: baseSize.inseam,
        };
        break;
      case 1: //triangle
        customSize = {
          neck: baseSize.neck - 6,
          chest: baseSize.chest - 13,
          waist: baseSize.waist + 26.4,
          belt: baseSize.belt + 18.7,
          hip: baseSize.hip + 7.8,
          shoulder: baseSize.shoulder - 1.1,
          armLength: baseSize.armLength - 1,
          inseam: baseSize.inseam + 0.8,
        };
        break;
      case 2: //rectangle
        customSize = {
          neck: baseSize.neck - 3,
          chest: baseSize.chest - 7,
          waist: baseSize.waist + 4.4,
          belt: baseSize.belt + 4,
          hip: baseSize.hip + 3.5,
          shoulder: baseSize.shoulder - 1,
          armLength: baseSize.armLength - 0.5,
          inseam: baseSize.inseam - 0.6,
        };
        break;
      case 3: //inverted triangle
        customSize = {
          neck: baseSize.neck + 3,
          chest: baseSize.chest + 6,
          waist: baseSize.waist - 8.7,
          belt: baseSize.belt - 8,
          hip: baseSize.hip - 8.5,
          shoulder: baseSize.shoulder + 3,
          armLength: baseSize.armLength + 0.5,
          inseam: baseSize.inseam + 0.2,
        };
        break;
      case 4: //oval
        customSize = {
          neck: baseSize.neck + 6,
          chest: baseSize.chest + 12,
          waist: baseSize.waist + 31.5,
          belt: baseSize.belt + 24,
          hip: baseSize.hip + 17.7,
          shoulder: baseSize.shoulder + 1.5,
          armLength: baseSize.armLength + 1,
          inseam: baseSize.inseam - 2.3,
        };
        break;
    }
    customSize = {
      neck: Math.round(customSize.neck),
      chest: Math.round(customSize.chest),
      waist: Math.round(customSize.waist),
      belt: Math.round(customSize.belt),
      hip: values.hipUnit === "in"?Math.round(customSize.hip/2.54*10)/10:Math.round(customSize.hip),
      shoulder: Math.round(customSize.shoulder),
      armLength: values.armLengthUnit === "in"?Math.round(customSize.armLength/2.54*10)/10:Math.round(customSize.armLength),
      inseam: values.inseamUnit === "in"?Math.round(customSize.inseam/2.54*10)/10:Math.round(customSize.inseam)
    };
    return customSize;
  }
}
const ControlHeader = styled.div`
  font-weight: 400;
  text-align: center;
  padding: 17px 0;
  border-bottom: solid 1px black;
  border-right: solid 1px black;
  position: sticky;
  top: 0;
  background: white;
  border-top: solid 1px black;
  z-index: 10;
`;

const ControllBody = styled.div`
  font-weight: 400;
  text-align: center;
  height: 100%;
  overflow-y: auto;
  .row {
    margin: 0;
    padding: 0;
  }
  .body-info-box {
    input[type='text'] {
      border: none;
      box-sizing: border-box;
      text-align: center;
    }
    .row {
      border-bottom: solid 1px black;
    }
    .col {
      padding: 17px 0;
      border-right: solid 1px black;
    }
    .px-4 {
      text-align: left;
    }
    select {
      border: 0;
      border-radius: 0px; /* iOS 둥근모서리 제거 */
      -webkit-appearance: none; /* 네이티브 외형 감추기 */
      -moz-appearance: none;
      appearance: none;
      //width: 100%;
      height: 100%;
      text-align: center;
      text-align-last: center;
      -ms-text-align-last: center;
      -moz-text-align-last: center;
      background: white;
    }

    .shape-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: 95px;
      border-right: 1px solid black;
      & > div {
        opacity: 0.5;
      }
      .active {
        opacity: 1;
      }
    }
    .input-error {
      color: red;
    }
  }

  .recommended-style-box {
    .row {
      border-bottom: solid 1px black;
    }
    .col {
      padding: 17px 0;
      border-right: solid 1px black;
    }
  }
`;

const ToggleButton = ({ on, off, name, value, onChange }) => {
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
  );
};
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
export { StyleControlBox, BodyInfoBox, RecommendedStyleBox, StyleController };
