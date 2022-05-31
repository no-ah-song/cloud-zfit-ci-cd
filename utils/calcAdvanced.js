
function calcBodyDimensions({ basedHeight, selectedShape, genders = [], values }) {
  let height = basedHeight;
  if (values.heightUnit === 'in') {
    height = Math.round(height * 2.54 *12);
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
      hip: values.hipUnit === 'in' ? Math.round((customSize.hip / 2.54 /12) * 10) / 10 : Math.round(customSize.hip),
      shoulder: Math.round(customSize.shoulder),
      armLength:
        values.armLengthUnit === 'in'
          ? Math.round((customSize.armLength / 2.54/12) * 10) / 10
          : Math.round(customSize.armLength),
      inseam:
        values.inseamUnit === 'in' ? Math.round((customSize.inseam / 2.54/12) * 10) / 10 : Math.round(customSize.inseam),
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
      hip: values.hipUnit === 'in' ? Math.round((customSize.hip / 2.54/12) * 10) / 10 : Math.round(customSize.hip),
      shoulder: Math.round(customSize.shoulder),
      armLength:
        values.armLengthUnit === 'in'
          ? Math.round((customSize.armLength / 2.54/12) * 10) / 10
          : Math.round(customSize.armLength),
      inseam:
        values.inseamUnit === 'in' ? Math.round((customSize.inseam / 2.54/12) * 10) / 10 : Math.round(customSize.inseam),
    };
    return customSize;
  }
}

export { calcBodyDimensions }