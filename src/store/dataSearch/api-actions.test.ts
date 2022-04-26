import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../../services/api';
import {
  makeFakeTitle,
  mockGuitar
} from '../../utils/mocks';
import {fetchSearchGuitarsAction} from './api-actions';
import {loadSearchGuitarsRequest, loadSearchGuitarsSuccess} from './actions';
import {APIRoute} from '../../const';
import {State} from '../root-reducer';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch fetchSearchGuitars when GET /guitars?name_like=', async () => {
    const mockGuitars = [mockGuitar];
    const searchGuitar = makeFakeTitle();

    mockAPI
      .onGet(`${APIRoute.SearchGuitars}${searchGuitar}`)
      .reply(200, mockGuitars);

    const store = mockStore();
    await store.dispatch(fetchSearchGuitarsAction(searchGuitar));

    expect(store.getActions()).toEqual([
      loadSearchGuitarsRequest(),
      loadSearchGuitarsSuccess(mockGuitars),
    ]);
  });

});
