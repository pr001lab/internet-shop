import {StatusLoading} from '../../const';
import {makeFakeTitle, mockCouponValue} from '../../utils/mocks';
import {postCouponFailure, postCouponRequest, postCouponSuccess} from './actions';
import {dataCouponPostReducer, DataType} from './dataCouponPostReducer';

describe('Reducer: data', () => {
  let state: DataType = {
    postCoupon: 0,
    postCouponLoading: StatusLoading.Idle,
    postCouponLoadingError: null,
  };
  beforeEach(() => {
    state = {
      postCoupon: 0,
      postCouponLoading: StatusLoading.Idle,
      postCouponLoadingError: null,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(dataCouponPostReducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('data: should update status of loading', () => {
    expect(dataCouponPostReducer(state, postCouponRequest()))
      .toEqual({
        ...state,
        postCouponLoading: StatusLoading.Loading,
      });
  });

  it('data: should update data and status of loading', () => {
    expect(dataCouponPostReducer(state, postCouponSuccess(mockCouponValue)))
      .toEqual({
        ...state,
        postCoupon: mockCouponValue,
        postCouponLoading: StatusLoading.Succeeded,
      });
  });

  it('data: should update error and status of loading', () => {
    const error = makeFakeTitle();

    expect(dataCouponPostReducer(state, postCouponFailure(error)))
      .toEqual({
        ...state,
        postCouponLoading: StatusLoading.Failed,
        postCouponLoadingError: error,
      });
  });

});
