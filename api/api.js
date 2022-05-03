import _ from 'lodash'

const getBrandList = async () => {
  const res = await fetch("https://zfit-data.s3.ap-northeast-2.amazonaws.com/data/brands.json");
  const data = await res.json();
  const objectData = Object.keys(data.brands);
  let brands = [];
  objectData.map((objectId) => {
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
  const res = await fetch("./data/fitting.json");
  const data = await res.json();
  async function filter() {
    try{

      if (brandId && productId && color && size && gender && height) {
        let fittings = data.fitting[brandId][productId][color][size][gender];
        let nearestHeight = await processBodyInfoData(fittings, "height", height);
        fittings = await fittings.filter((fitting) => {
          return (
            fitting.height == nearestHeight
          );
        });
        let nearestHip = await processBodyInfoData(fittings, "hip", hip);
        fittings = await fittings.filter((fitting) => {
          return (
            fitting.hip == nearestHip
          );
        });
        let nearestArmLength = await processBodyInfoData(fittings, "armLength", armLength);
        fittings = await fittings.filter((fitting) => {
          return (
            fitting.armLength == nearestArmLength
          );
        });
        let nearestInseam = await processBodyInfoData(fittings, "inseam", inseam);
        fittings = await fittings.filter((fitting) => {
          return (
            fitting.inseam == nearestInseam
          );
        });
        let nearestChest = await processBodyInfoData(fittings, "chest", chest);
        fittings = await fittings.filter((fitting) => {
          return (
            fitting.chest == nearestChest
          );
        });
        let nearestNeck = await processBodyInfoData(fittings, "neck", neck);
        fittings = await fittings.filter((fitting) => {
          return (
            fitting.neck == nearestNeck
          );
        });
        let nearestBelt= await processBodyInfoData(fittings, "belt", belt);
        fittings = await fittings.filter((fitting) => {
          return (
            fitting.belt == nearestBelt
          );
        });
        let nearestWaist= await processBodyInfoData(fittings, "waist", waist);
        fittings = await fittings.filter((fitting) => {
          return (
            fitting.waist == nearestWaist
          );
        });
        let nearestShoulder = await processBodyInfoData(fittings, "acrossShoulder", acrossShoulder);
        fittings = await fittings.filter((fitting) => {
          return (
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
  return nearestKey
}
export { getBrandList, getFittingImages };
