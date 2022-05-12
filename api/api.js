import _, { forEach } from 'lodash';

const getBrandList = async () => {
  const res = await fetch('https://zfit-data.s3.ap-northeast-2.amazonaws.com/data/brands.json');
  const data = await res.json();
  const objectData = Object.keys(data.brands);
  let brands = [];
  objectData.map(objectId => {
    brands.push(data.brands[objectId]);
  });
  return brands;
};

// const getProductList = async () => {
//   const res = await fetch("./data/products.json");
//   const data = await res.json();
//   const products = data.products;
//   return products;
// };

// const getProductItem = async (productId) => {
//   const res = await fetch("./data/products.json");
//   const data = await res.json();
//   const product = data.products[productId];
//   return product;
// };

const getFittingImages = async ({
  brandId,
  productId,
  color,
  size,
  gender,
  height,
  hip,
  armLength,
  inseam,
  chest,
  neck,
  waist,
  belt,
  acrossShoulder,
}) => {
  const res = await fetch('./data/fitting.json');
  const data = await res.json();
  async function filter() {
    try {
      let fittings = data.fitting[brandId][productId][color][size][gender];
      let nearestHeight = processBodyInfoData(fittings, 'height', height);
      fittings = fittings.filter(fitting => {
        return fitting.height == nearestHeight;
      });
      let nearestHip = processBodyInfoData(fittings, 'hip', hip);
      fittings = fittings.filter(fitting => {
        return fitting.hip == nearestHip;
      });
      let nearestArmLength = processBodyInfoData(fittings, 'armLength', armLength);
      fittings = fittings.filter(fitting => {
        return fitting.armLength == nearestArmLength;
      });
      let nearestInseam = processBodyInfoData(fittings, 'inseam', inseam);
      fittings = fittings.filter(fitting => {
        return fitting.inseam == nearestInseam;
      });
      let nearestChest = processBodyInfoData(fittings, 'chest', chest);
      fittings = fittings.filter(fitting => {
        return fitting.chest == nearestChest;
      });
      let nearestNeck = processBodyInfoData(fittings, 'neck', neck);
      fittings = fittings.filter(fitting => {
        return fitting.neck == nearestNeck;
      });
      let nearestBelt = processBodyInfoData(fittings, 'belt', belt);
      fittings = fittings.filter(fitting => {
        return fitting.belt == nearestBelt;
      });
      let nearestWaist = processBodyInfoData(fittings, 'waist', waist);
      fittings = fittings.filter(fitting => {
        return fitting.waist == nearestWaist;
      });
      let nearestShoulder = processBodyInfoData(fittings, 'acrossShoulder', acrossShoulder);
      fittings = fittings.filter(fitting => {
        return fitting.acrossShoulder == nearestShoulder;
      });
      return fittings[0];
    } catch (error) {
      throw 'Fiter Data is Invalid';
    }
  }
  const fittingImage = filter();
  return fittingImage;
};

function findNearestInteger(data, target) {
  let near = 0;
  let abs = 0;
  let min = 999; // 해당 범위에서 가장 큰 값

  data.forEach(el => {
    abs = el - target < 0 ? -(el - target) : el - target;
    if (abs < min) {
      min = abs;
      near = el;
    }
  });
  return near;
}

function processBodyInfoData(data, key, value) {
  data.sort((a, b) => a[key] - b[key]);
  let distinctArr = _.uniqBy(data, key);
  const keyArr = distinctArr.map(el => {
    return el[key];
  });
  let nearestKey = findNearestInteger(keyArr, value);
  return nearestKey;
}
export { getBrandList, getFittingImages };
