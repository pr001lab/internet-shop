import {toast} from 'react-toastify';
import {APIRoute} from '../../const';
import {ThunkActionResult} from '../../types/action';
import {ReviewPostType} from '../../types/review';
import {
  postReviewFailure,
  postReviewRequest,
  postReviewSuccess
} from './actions';

const POST_FAILURE_MESSAGE = 'Не удалось отправить данные. Попробуйте попозже.';

export const postReviewAction = (review: ReviewPostType): ThunkActionResult => (
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(postReviewRequest());
    try {
      const {data} = await api.post(APIRoute.Reviews, review);
      dispatch(postReviewSuccess(data));
    } catch (error: any) {
      dispatch(postReviewFailure(error.toString()));
      toast.error(POST_FAILURE_MESSAGE, {
        toastId: 'error1',
      });
    }
  }
);
