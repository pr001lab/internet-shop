import {configureMockStore} from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {APIRoute} from '../../const';
import {createAPI} from '../../services/api';
import {
  mockGuitar
} from '../../utils/mocks';
import {State} from '../root-reducer';
import {
  loadGuitarByIdRequest,
  loadGuitarByIdSuccess
} from './actions';
import {fetchGuitarByIdAction} from './api-actions';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch fetchGuitarById when GET /guitars/id', async () => {
    const mockGuitars = mockGuitar;
    mockAPI
      .onGet(`${APIRoute.Guitars}/${mockGuitars.id}${APIRoute.EmbedComments}`)
      .reply(200, mockGuitars);

    const store = mockStore();
    await store.dispatch(fetchGuitarByIdAction(String(mockGuitars.id)));

    expect(store.getActions()).toEqual([
      loadGuitarByIdRequest(),
      loadGuitarByIdSuccess(mockGuitars),
    ]);
  });

});
