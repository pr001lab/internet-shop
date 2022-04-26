import {toast} from 'react-toastify';
import {APIRoute} from '../../const';
import {ThunkActionResult} from '../../types/action';
import {
  loadGuitarByIdFailure,
  loadGuitarByIdRequest,
  loadGuitarByIdSuccess
} from './actions';

const GET_FAILURE_MESSAGE = 'Не удалось получить данные. Попробуйте попозже.';

export const fetchGuitarByIdAction = (id: string): ThunkActionResult => (
  async (dispatch, _getState, api): Promise<void> => {
    const baseUrl = `${APIRoute.Guitars}/${id}${APIRoute.EmbedComments}`;
    dispatch(loadGuitarByIdRequest());
    try {
      const {data} = await api.get(baseUrl);
      dispatch(loadGuitarByIdSuccess(data));
    } catch (error: any) {
      dispatch(loadGuitarByIdFailure(error.toString()));
      if (error.response.status !== 404) {
        toast.error(GET_FAILURE_MESSAGE, {
          toastId: 'error1',
        });
      }
    }
  }
);
