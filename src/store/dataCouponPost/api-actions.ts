import {toast} from 'react-toastify';
import {APIRoute} from '../../const';
import {ThunkActionResult} from '../../types/action';
import {CouponPostType} from '../../types/coupon';
import {postCouponFailure, postCouponRequest, postCouponSuccess} from './actions';

const POST_FAILURE_MESSAGE = 'Не удалось отправить данные. Попробуйте попозже.';
const INVALID_COUPON_ERROR_STATUS = 400;

export const postCouponAction = (postData: CouponPostType): ThunkActionResult => (
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(postCouponRequest());
    try {
      const {data} = await api.post(APIRoute.Coupon, postData);
      dispatch(postCouponSuccess(data));
    } catch (error: any) {
      if (error?.response?.status === INVALID_COUPON_ERROR_STATUS) {
        dispatch(postCouponFailure(String(error.response.status)));
      } else {
        toast.error(POST_FAILURE_MESSAGE, {
          toastId: 'error1',
        });
      }
    }
  }
);
