import {configureMockStore} from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {APIRoute} from '../../const';
import {createAPI} from '../../services/api';
import {
  mockGuitar,
  mockReview
} from '../../utils/mocks';
import {State} from '../root-reducer';
import {loadReviewsRequest, loadReviewsSuccess} from './actions';
import {fetchReviewsAction} from './api-actions';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch fetchReviews when GET guitars/id/comments', async () => {
    const mockId = String(mockGuitar.id);
    mockAPI
      .onGet(`${APIRoute.Guitars}/${mockId}${APIRoute.Reviews}`)
      .reply(200, [mockReview]);

    const store = mockStore();
    await store.dispatch(fetchReviewsAction(mockId));

    expect(store.getActions()).toEqual([
      loadReviewsRequest(),
      loadReviewsSuccess([mockReview]),
    ]);
  });

});
