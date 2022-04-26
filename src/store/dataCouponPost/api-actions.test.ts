import {configureMockStore} from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {APIRoute} from '../../const';
import {createAPI} from '../../services/api';
import {mockCouponPost, mockCouponValue} from '../../utils/mocks';
import {State} from '../root-reducer';
import {postCouponRequest, postCouponSuccess} from './actions';
import {postCouponAction} from './api-actions';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch couponValue when POST /coupons', async () => {
    mockAPI
      .onPost(`${APIRoute.Coupon}`)
      .reply(200, mockCouponValue);

    const store = mockStore();
    await store.dispatch(postCouponAction(
      mockCouponPost,
    ));

    expect(store.getActions()).toEqual([
      postCouponRequest(),
      postCouponSuccess(mockCouponValue),
    ]);
  });

});
