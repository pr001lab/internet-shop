import {StatusLoading} from '../../const';
import {NameSpace, State} from '../root-reducer';

export const selectCoupon = (state: State): number => (
  state[NameSpace.DataCouponPost].postCoupon
);
export const selectPostCouponLoading = (state: State): StatusLoading => (
  state[NameSpace.DataCouponPost].postCouponLoading
);
export const selectPostCouponLoadingError = (state: State): string | null => (
  state[NameSpace.DataCouponPost].postCouponLoadingError
);
