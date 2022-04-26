import {configureMockStore} from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {APIRoute} from '../../const';
import {createAPI} from '../../services/api';
import {mockReviewPost} from '../../utils/mocks';
import {State} from '../root-reducer';
import {postReviewRequest, postReviewSuccess} from './actions';
import {postReviewAction} from './api-actions';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch comment when POST /comments', async () => {
    mockAPI
      .onPost(`${APIRoute.Reviews}`)
      .reply(200, mockReviewPost);

    const store = mockStore();
    await store.dispatch(postReviewAction(
      mockReviewPost,
    ));

    expect(store.getActions()).toEqual([
      postReviewRequest(),
      postReviewSuccess(mockReviewPost),
    ]);
  });

});
