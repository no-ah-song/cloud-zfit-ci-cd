import { atom, selector, useSetRecoilState, useRecoilValue } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { getBrandList } from '../api/api';

const { persistAtom } = recoilPersist();
// PERSIST SSR CHECK
const ssrCompletedState = atom({
  key: 'SsrCompleted',
  default: false,
});
const useSsrComplectedState = () => {
  const setSsrCompleted = useSetRecoilState(ssrCompletedState);
  return () => setSsrCompleted(true);
};
const persistAtomEffect = param => {
  param.getPromise(ssrCompletedState).then(() => persistAtom(param));
};
// ATOM
const navState = atom({
  key: 'navState',
  default: { active: 0 },
});
const brandState = atom({
  key: 'brandState',
  default: [],
});

const selectedProductState = atom({
  key: 'selectedProductState',
  default: Object.freeze({
    productId: '',
    productName: '',
    recommendSize: '',
    brandName: '',
    brandId: '',
    type: '',
    colors: [
      {
        color: '',
        src: '',
        sizes: [],
      },
    ],
    gender: '',
    genders: [],
    color: '',
    sizes: '',
  }),
});
const avatarState = atom({
  key: 'avatarState',
  default: Object.freeze({
    // avartar 정보
    height: '',
    weight: '',
    genders: '',
    hip: '',
    armLength: '',
    inseam: '',
    neck: '',
    chest: '',
    waist: '',
    belt: '',
    acrossShoulder: '',
  }),
  // effects_UNSTABLE: [persistAtomEffect]
});

const colorAndSizeState = atom({
  key: 'colorAndSizeState',
  default: Object.freeze({
    // avartar 정보
    color: '',
    size: '',
  }),
});

const fittingIsOpenState = atom({
  key: 'fittingIsOpenState',
  default: false,
});

const menuIsOpenState = atom({
  key: 'menuIsOpenState',
  default: false,
});

const fitmapState = atom({
  key: 'fitmapState',
  default: { fitmap: false },
});

const fittingImagesState = atom({
  key: 'fittingImagesState',
  default: {
    acrossShoulder: 0,
    armLength: 0,
    belt: 0,
    brand: '',
    chest: 0,
    color: '',
    gender: '',
    height: 0,
    hip: 0,
    images: [],
    inseam: 0,
    neck: 0,
    productId: '',
    size: '',
    waist: 0,
    fitmap: false,
  },
});

const fittingSelector = selector({
  key: 'fittingSelector',
  get: ({ get }) => {
    const product = get(selectedProductState);
    const colorAndSize = get(colorAndSizeState);
    const avatar = get(avatarState);
    const fitmap = get(fitmapState);
    const fitting = {
      height: avatar.height,
      hip: avatar.hip,
      armLength: avatar.armLength,
      inseam: avatar.inseam,
      chest: avatar.chest,
      neck: avatar.neck,
      waist: avatar.waist,
      acrossShoulder: avatar.acrossShoulder,
      belt: avatar.belt,
      gender: avatar.genders[0],
      brandId: product.brandId,
      productId: product.productId,
      color: colorAndSize.color,
      size: colorAndSize.size,
      fitmap: fitmap.fitmap,
    };
    return fitting;
  },
});

export {
  navState,
  brandState,
  avatarState,
  useSsrComplectedState,
  selectedProductState,
  fittingSelector,
  fittingIsOpenState,
  menuIsOpenState,
  colorAndSizeState,
  fittingImagesState,
  fitmapState,
};
