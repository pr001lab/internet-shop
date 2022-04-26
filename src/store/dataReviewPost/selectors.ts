import {StatusLoading} from '../../const';
import {ReviewPostType} from '../../types/review';
import {NameSpace, State} from '../root-reducer';

export const selectPostReview = (state: State): ReviewPostType | null => (
  state[NameSpace.DataReviewPost].postReview
);
export const selectPostReviewLoading = (state: State): StatusLoading => (
  state[NameSpace.DataReviewPost].postReviewLoading
);
export const selectPostReviewLoadingError = (state: State): string | null => (
  state[NameSpace.DataReviewPost].postReviewLoadingError
);
