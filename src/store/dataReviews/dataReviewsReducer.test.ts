import {StatusLoading} from '../../const';
import {
  makeFakeTitle, mockReview
} from '../../utils/mocks';
import {loadReviewsFailure, loadReviewsRequest, loadReviewsSuccess} from './actions';
import {dataReviewsReducer, DataType} from './dataReviewsReducer';


describe('Reducer: data', () => {
  let state: DataType = {
    reviews: [],
    reviewsLoading: StatusLoading.Idle,
    reviewsLoadingError: null,
  };
  beforeEach(() => {
    state = {
      reviews: [],
      reviewsLoading: StatusLoading.Idle,
      reviewsLoadingError: null,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(dataReviewsReducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('data: should update status of loading', () => {
    expect(dataReviewsReducer(state, loadReviewsRequest()))
      .toEqual({
        ...state,
        reviewsLoading: StatusLoading.Loading,
      });
  });

  it('data: should update data and status of loading', () => {
    expect(dataReviewsReducer(state, loadReviewsSuccess([mockReview])))
      .toEqual({
        ...state,
        reviews: [mockReview],
        reviewsLoading: StatusLoading.Succeeded,
      });
  });

  it('data: should update error and status of loading', () => {
    const error = makeFakeTitle();

    expect(dataReviewsReducer(state, loadReviewsFailure(error)))
      .toEqual({
        ...state,
        reviewsLoading: StatusLoading.Failed,
        reviewsLoadingError: error,
      });
  });

});
