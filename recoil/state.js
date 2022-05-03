import { atom, selector, useSetRecoilState, useRecoilValue } from "recoil";
import { recoilPersist } from "recoil-persist";
import { getBrandList, getProductList } from "../api/api";

const { persistAtom } = recoilPersist();
// PERSIST SSR CHECK
const ssrCompletedState = atom({
  key: "SsrCompleted",
  default: false,
});
const useSsrComplectedState = () => {
  const setSsrCompleted = useSetRecoilState(ssrCompletedState);
  return () => setSsrCompleted(true);
};
const persistAtomEffect = (param) => {
  param.getPromise(ssrCompletedState).then(() => persistAtom(param));
};
// ATOM
const navState = atom({
  key: "navState",
  default: { active: 0 },
});
const brandState = atom({
  key: "brandState",
  default: [],
});

const selectedProductState = atom({
  key: "selectedProductState",
  default: Object.freeze({
    productId: "",
    productName: "",
    recommendSize: "",
    brandName: "",
    brandId: "",
    type: "",
    colors: [
      {
        color: "",
        src: "",
        sizes: [],
      },
    ],
    gender: "", 
    genders: ["men"],
    color: "",
    sizes: ""
  }),
});

const selectedState = atom({
  key: "selectedState",
  default: {
    productId: "Hoodie0001",
    gender: "men",
  },
});

const avatarState = atom({
  key: "avatarState",
  default: Object.freeze({
    // avartar 정보
    height: "170",
    weight: "60",
    genders: "men",
    shape: "square",
    hip: "90",
    armLength: "60",
    inseam: "75",
    neck:"",
    chest:"",
    waist:"",
    belt:"",
    shoulder:"",
  }),
  // effects_UNSTABLE: [persistAtomEffect]
});

const colorAndSizeState = atom({
  key: "colorAndSizeState",
  default: Object.freeze({
    // avartar 정보
    color:"",
    size:""
  }),
});

const fittingIsOpenState = atom({
  key: "fittingIsOpenState",
  default: false,
});

const menuIsOpenState = atom({
  key: "menuIsOpenState",
  default: false,
});

const fittingImagesState = atom({
  key: "fittingImagesState",
  default: {
    acrossShoulder: 308,
    armLength: 0,
    belt: 0,
    brand: "",
    chest: 0,
    color: "",
    gender: "",
    height: 0,
    hip: 0,
    images: [],
    inseam: 0,
    neck: 0,
    productId: "109d6b9f-f1f0-452c-bdcf-0d139f7ed814",
    size: "",
    waist: 0
  },
});

const fittingSelector = selector({
  key: "fittingSelector",
  get: ({ get }) => {
    const product=get(selectedProductState);
    const colorAndSize = get(colorAndSizeState);
    const avatar = get(avatarState);
    const fitting={
      height: avatar.height,
      hip: avatar.hip,
      armLength: avatar.armLength,
      inseam: avatar.inseam ,
      chest:"",
      neck:"",
      waist:"",
      acrossShoulder:"",
      belt:"",
      gender: product.genders[0],
      brandId: product.brandId,
      productId:product.productId,
      color:colorAndSize.color,
      size:colorAndSize.size,
      brand:""
    }
    return fitting;
  },
});

// SELECTOR
const avatarSelector = selector({
  key: "avatarSelector",
  get: ({ get }) => get(avatarState),
});
const brandListSelector = selector({
  key: "brandListSelector",
  get: async ({ get }) => {
    const response = await getBrandList();
    return response;
  },
});

export {
  navState,
  brandState,
  avatarState,
  brandListSelector,
  avatarSelector,
  useSsrComplectedState,
  selectedProductState,
  fittingSelector,
  selectedState,
  fittingIsOpenState,
  menuIsOpenState,
  colorAndSizeState,
  fittingImagesState,
};
