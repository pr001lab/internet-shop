import {configureMockStore} from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {APIRoute} from '../../const';
import {createAPI} from '../../services/api';
import {
  makeFakeCount,
  mockGuitar
} from '../../utils/mocks';
import {State} from '../root-reducer';
import {
  loadGuitarsRequest,
  loadGuitarsSuccess
} from './actions';
import {fetchGuitarsAction} from './api-actions';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch fetchGuitars when GET /guitars', async () => {
    const mockGuitars = [mockGuitar];
    const guitarsCount = makeFakeCount();
    const headers = {
      'x-total-count': guitarsCount,
    };
    mockAPI
      .onGet(`${APIRoute.Guitars}${APIRoute.EmbedComments}`)
      .reply(200, mockGuitars, headers);

    const store = mockStore();
    await store.dispatch(fetchGuitarsAction());

    expect(store.getActions()).toEqual([
      loadGuitarsRequest(),
      loadGuitarsSuccess(mockGuitars, headers['x-total-count']),
    ]);
  });

});
