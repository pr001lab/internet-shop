import {StatusLoading} from '../../const';
import {
  makeFakeTitle, mockReviewPost
} from '../../utils/mocks';
import {postReviewFailure, postReviewRequest, postReviewSuccess} from './actions';
import {dataReviewPostReducer, DataType} from './dataReviewPostReducer';

describe('Reducer: data', () => {
  let state: DataType = {
    postReview: null,
    postReviewLoading: StatusLoading.Idle,
    postReviewLoadingError: null,
  };
  beforeEach(() => {
    state = {
      postReview: null,
      postReviewLoading: StatusLoading.Idle,
      postReviewLoadingError: null,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(dataReviewPostReducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('data: should update status of loading', () => {
    expect(dataReviewPostReducer(state, postReviewRequest()))
      .toEqual({
        ...state,
        postReviewLoading: StatusLoading.Loading,
      });
  });

  it('data: should update data and status of loading', () => {
    expect(dataReviewPostReducer(state, postReviewSuccess(mockReviewPost)))
      .toEqual({
        ...state,
        postReview: mockReviewPost,
        postReviewLoading: StatusLoading.Succeeded,
      });
  });

  it('data: should update error and status of loading', () => {
    const error = makeFakeTitle();

    expect(dataReviewPostReducer(state, postReviewFailure(error)))
      .toEqual({
        ...state,
        postReviewLoading: StatusLoading.Failed,
        postReviewLoadingError: error,
      });
  });

});
