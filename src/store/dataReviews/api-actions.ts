import {toast} from 'react-toastify';
import {APIRoute} from '../../const';
import {ThunkActionResult} from '../../types/action';
import {
  loadReviewsFailure,
  loadReviewsRequest,
  loadReviewsSuccess
} from './actions';

const GET_FAILURE_MESSAGE = 'Не удалось получить данные. Попробуйте попозже.';

export const fetchReviewsAction = (id: string): ThunkActionResult => (
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(loadReviewsRequest());
    try {
      const {data} = await api.get(`${APIRoute.Guitars}/${id}${APIRoute.Reviews}`);
      dispatch(loadReviewsSuccess(data));
    } catch (error: any) {
      dispatch(loadReviewsFailure(error.toString()));
      toast.error(GET_FAILURE_MESSAGE, {
        toastId: 'error1',
      });
    }
  }
);
