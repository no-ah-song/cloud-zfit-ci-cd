import _ from 'lodash'
import { resolveHref } from 'next/dist/shared/lib/router/router';
const getBrandList = async () => {
  const res = await fetch("http://localhost:3001/data/brands.json");
  const data = await res.json();
  const objectData = Object.keys(data.brands);
  let brands = [];
  objectData.map((objectId) => {
    brands.push(data.brands[objectId]);
  });
  return brands;
};

const getProductList = async () => {
  const res = await fetch("http://localhost:3001/data/products.json");
  const data = await res.json();
  const products = data.products;
  return products;
};

const getProductItem = async (productId) => {
  const res = await fetch("http://localhost:3001/data/products.json");
  const data = await res.json();
  const product = data.products[productId];
  return product;
};

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
  const res = await fetch("http://localhost:3001/data/fitting.json");
  const data = await res.json();
  async function filter() {
    try{
      if (brandId && productId && color && size && gender && height) {
        let fittings = data.fitting[brandId][productId][color][size][gender];
      // await fittings.sort((a, b) => a[height] - b[height]);
        let nearestHeight = await processBodyInfoData(fittings, "height", height);
        let nearestHip = await processBodyInfoData(fittings, "hip", hip);
        let nearestArmLength = await processBodyInfoData(fittings, "armLength", armLength);
        let nearestInseam = await processBodyInfoData(fittings, "inseam", inseam);
        let nearestChest = await processBodyInfoData(fittings, "chest", chest);
        let nearestNeck = await processBodyInfoData(fittings, "neck", neck);
        let nearestBelt= await processBodyInfoData(fittings, "belt", belt);
        let nearestWaist= await processBodyInfoData(fittings, "waist", waist);
        let nearestShoulder = await processBodyInfoData(fittings, "acrossShoulder", acrossShoulder);

        fittings = await fittings.filter((fitting) => {
          return (
            fitting.height == nearestHeight &&
            fitting.hip == nearestHip &&
            fitting.armLength == nearestArmLength &&
            fitting.inseam == nearestInseam &&
            fitting.chest == nearestChest &&
            fitting.neck == nearestNeck &&
            fitting.belt == nearestBelt &&
            fitting.waist == nearestWaist &&
            fitting.acrossShoulder == nearestShoulder
          );
        });
        return fittings[0]
      }else{
        throw 'Fiter Data is Invalid'
      }
    }catch(error){
      throw 'Fiter Data is Invalid'
    }
  }
  const fittingImage = filter();
  return fittingImage;
};

async function findNearestInteger (data, target) {
  let near = 0; 
  let abs = 0;
  let min = 999; // 해당 범위에서 가장 큰 값

  for(var i=0; i < data.length; i++){
    abs = ((data[i] - target) < 0) ? - ((data[i])-target) : (data[i] - target);
    if(abs < min){
      min = abs;
      near = data[i];
    }else if(abs == min){
    }else{
      break;
    }
  }

  return near;
}

async function processBodyInfoData(data, key, value) {
  await data.sort((a, b) => a[key] - b[key]);
  let distinctArr = _.uniqBy(data, key);
  const keyArr = distinctArr.map((el)=>{
    return el[key]
  });
  let nearestKey = await findNearestInteger(keyArr, value);
//  console.log(nearestKey);
  return nearestKey
}
export { getBrandList, getProductList, getProductItem, getFittingImages };
