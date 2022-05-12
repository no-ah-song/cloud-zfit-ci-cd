import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import ProductsHorizontal from '../components/ProductsHorizontal';

import { avatarState, useSsrComplectedState, selectedProductState } from '../recoil/state';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

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
            <div classNma="row">
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

  const initialValues = {
    genders: selectedProduct.genders,
    height: avatar.height,
    weight: avatar.weight,
    shape: avatar.shape,
    hip: avatar.hip,
    armLength: avatar.armLength,
    inseam: avatar.inseam,
    neck: avatar.neck,
    chest: avatar.chest,
    belt: avatar.belt,
    acrossShoulder: avatar.acrossShoulder,
  };
  const [values, setValues] = useState(initialValues);

  const handleChange = async event => {
    const { name, value } = event.target;
    if (name === 'height' || name === 'gender') {
      const advancedBody = calcBodyDimention(selectedShape);
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

  const changeValue = (targetName, targetValue) => {
    setValues({ ...values, [targetName]: targetValue });
  };

  useEffect(() => {
    setAvatar(values);
  }, [values]);

  useEffect(() => {
    setValues({
      ...values,
      ['genders']: selectedProduct.genders,
    });
  }, [selectedProduct]);

  useEffect(() => {
    updateBodyDimention();
  }, [selectedShape]); //shape 데이터 변경

  const updateBodyDimention = useCallback(() => {
    const advancedBody = calcBodyDimention(selectedShape);
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
  }, [values, selectedShape]);

  function calcBodyDimention(selectedShape) {
    const height = Number(document.getElementsByName('height')[0].value);
    const genderEl = document.querySelectorAll("[data-toggle-group='gender']");
    if (avatar.gender === 'women') {
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
        hip: Math.round(customSize.hip),
        shoulder: Math.round(customSize.shoulder),
        armLength: Math.round(customSize.armLength),
        inseam: Math.round(customSize.inseam),
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
        hip: Math.round(customSize.hip),
        shoulder: Math.round(customSize.shoulder),
        armLength: Math.round(customSize.armLength),
        inseam: Math.round(customSize.inseam),
      };
      return customSize;
    }
  }

  const handleChangeToggle = useCallback(event => {
    const toggles = document.getElementsByClassName(event.target.dataset.toggleGroup);
    for (let i = 0; i < toggles.length; i++) {
      toggles[i].classList.remove('toggle-active');
      toggles[i].classList.add('toggle');
    }
    event.target.classList.remove('toggle');
    event.target.classList.add('toggle-active');
  }, []);

  function BodyDimensionSelectBox({ selected, onChange, min = 0, max = 100, name }) {
    const rendering = () => {
      const result = [];
      for (let i = min; i <= max; i++) {
        result.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
      }
      return result;
    };

    return (
      <select name={name} onChange={onChange} value={selected} role="button">
        {rendering()}
      </select>
    );
  }

  return (
    <div className="body-info-box">
      <div className="row w-100">
        <div className="col col-6 px-4">Gender</div>
        {selectedProduct.genders.length > 1 ? (
          <>
            <div
              className={values.genders[0] === 'men' ? 'col col-3 toggle-active' : 'col col-3 toggle'}
              onClick={() => changeValue('genders', ['men'])}
              data-toggle-group="gender"
              data-value="men"
              role="button">
              Men
            </div>
            <div
              className={values.genders[0] === 'women' ? 'col col-3 toggle-active' : 'col col-3 toggle'}
              onClick={() => changeValue('genders', ['women'])}
              data-toggle-group="gender"
              data-value="women"
              role="button">
              Women
            </div>
          </>
        ) : values.genders[0] === 'men' ? (
          <div
            className="col col-6 toggle-active"
            onClick={() => changeValue('genders', ['men'])}
            data-toggle-group="gender"
            data-value="men"
            role="button">
            Men
          </div>
        ) : (
          <div
            className="col col-6 toggle-active"
            onClick={() => changeValue('genders', ['women'])}
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
          <BodyDimensionSelectBox
            selected={values.height}
            onChange={handleChange}
            min={values.genders === 'men' ? 150 : 140}
            max={values.genders === 'men' ? 230 : 205}
            name="height"
          />
        </div>
        <div className="col-3 d-flex p-0">
          <div
            className="col col-12 toggle-active height-unit"
            data-toggle-group="height-unit"
            onClick={handleChangeToggle}>
            cm
          </div>
        </div>
      </div>
      <div className="row w-100">
        <div className="col col-3 px-4">Weight</div>
        <div className="col col-6">
          <BodyDimensionSelectBox
            selected={values.weight}
            onChange={handleChange}
            min={values.genders === 'men' ? 50 : 40}
            max={values.genders === 'men' ? 100 : 100}
            name="weight"
          />
        </div>
        <div className="col-3 d-flex p-0">
          <div
            className="col col-12 toggle-active weight-unit"
            data-toggle-group="weight-unit"
            onClick={handleChangeToggle}>
            kg
          </div>
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
              <Image src="/images/men_trapezoid.png" menW_triangle width={71} height={96}></Image>
            </div>
            <div onClick={() => setSelectedShape(1)} className={selectedShape === 1 ? 'active' : ''}>
              <Image src="/images/men_triangle.png" width={71} height={96}></Image>
            </div>
            <div onClick={() => setSelectedShape(2)} className={selectedShape === 2 ? 'active' : ''}>
              <Image src="/images/men_rectangle.png" menW_inverted_triangle width={71} height={96}></Image>
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
          <BodyDimensionSelectBox
            selected={values.hip}
            onChange={handleChange}
            min={values.genders === 'men' ? 85 : 80}
            max={values.genders === 'men' ? 120 : 125}
            name="hip"
          />
        </div>
        <div className="col-3 d-flex p-0">
          <div className="col col-12 toggle-active hip-unit" data-toggle-group="hip-unit" onClick={handleChangeToggle}>
            cm
          </div>
        </div>
      </div>
      <div className="row w-100">
        <div className="col col-3 px-4 text-nowrap">Arm Length</div>
        <div className="col col-6">
          <BodyDimensionSelectBox
            selected={values.armLength}
            onChange={handleChange}
            min={values.genders === 'men' ? 43 : 41}
            max={values.genders === 'men' ? 81 : 72}
            name="armLength"
          />
        </div>
        <div className="col-3 d-flex p-0">
          <div
            className="col col-12 toggle-active armlength-unit"
            data-toggle-group="armlength-unit"
            onClick={handleChangeToggle}>
            cm
          </div>
        </div>
      </div>
      <div className="row w-100">
        <div className="col col-3 px-4">Inseam</div>
        <div className="col col-6">
          <BodyDimensionSelectBox
            selected={values.inseam}
            onChange={handleChange}
            min={values.genders === 'men' ? 61 : 59}
            max={values.genders === 'men' ? 118 : 109}
            name="inseam"
          />
        </div>
        <div className="col-3 d-flex p-0">
          <div
            className="col col-12 toggle-active inseam-unit"
            data-toggle-group="inseam-unit"
            onClick={handleChangeToggle}>
            cm
          </div>
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
    .toggle-active::before {
      content: ' ◆ ';
    }
    .toggle::before {
      content: ' ◇ ';
    }
    .toggle-active {
      color: black;
    }
    .toggle {
      color: #ababab;
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

export { StyleControlBox, BodyInfoBox, RecommendedStyleBox, StyleController };
