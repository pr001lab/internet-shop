import {toast} from 'react-toastify';
import {
  loadSearchGuitarsRequest,
  loadSearchGuitarsFailure,
  loadSearchGuitarsSuccess
} from './actions';
import {APIRoute} from '../../const';
import {ThunkActionResult} from '../../types/action';

const GET_FAILURE_MESSAGE = 'Не удалось получить данные. Попробуйте попозже';

export const fetchSearchGuitarsAction = (searchGuitar: string): ThunkActionResult => (
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(loadSearchGuitarsRequest());
    try {
      const {data} = await api.get(`${APIRoute.SearchGuitars}${searchGuitar}`);
      dispatch(loadSearchGuitarsSuccess(data));
    } catch (error: any) {
      dispatch(loadSearchGuitarsFailure(error.toString()));
      toast.error(GET_FAILURE_MESSAGE, {
        toastId: 'error1',
      });
    }
  }
);
