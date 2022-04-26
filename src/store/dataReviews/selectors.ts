import {StatusLoading} from '../../const';
import {ReviewType} from '../../types/review';
import {NameSpace, State} from '../root-reducer';

export const selectReviews = (state: State): ReviewType[] => (
  state[NameSpace.DataReviews].reviews
);
export const selectReviewsLoading = (state: State): StatusLoading => (
  state[NameSpace.DataReviews].reviewsLoading
);
export const selectReviewsLoadingError = (state: State): string | null => (
  state[NameSpace.DataReviews].reviewsLoadingError
);
