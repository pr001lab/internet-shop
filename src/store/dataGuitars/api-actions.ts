import {toast} from 'react-toastify';
import {APIRoute} from '../../const';
import {ThunkActionResult} from '../../types/action';
import {
  loadGuitarsFailure,
  loadGuitarsRequest,
  loadGuitarsSuccess
} from './actions';

const GET_FAILURE_MESSAGE = 'Не удалось получить данные. Попробуйте попозже.';

export const fetchGuitarsAction = (sort = {}): ThunkActionResult => (
  async (dispatch, _getState, api): Promise<void> => {
    const baseUrl = `${APIRoute.Guitars}${APIRoute.EmbedComments}`;
    dispatch(loadGuitarsRequest());
    try {
      const {data, headers} = await api.get(baseUrl, {params: sort});
      dispatch(loadGuitarsSuccess(data, headers['x-total-count']));
    } catch (error: any) {
      dispatch(loadGuitarsFailure(error.toString()));
      toast.error(GET_FAILURE_MESSAGE, {
        toastId: 'error1',
      });
    }
  }
);
