import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {ReviewPostField, StatusLoading} from '../../const';
import {mockGuitar, mockReview} from '../../utils/mocks';
import {getGuitarTypeListWithStrings} from '../../utils/utils';
import {titleRating, ValidationMessage} from '../review-add-modal/review-add-modal';
import ReviewAddStarRating from '../review-add-star-rating/review-add-star-rating';

const mockGuitarsCount = 27;
const mockStore = configureMockStore([thunk.withExtraArgument({
  get: () => [mockGuitar],
})]);

const store = mockStore({
  DATAGUITARS: {
    guitars: [mockGuitar],
    guitarsCount: mockGuitarsCount,
    guitarsPriceMin: mockGuitar.price,
    guitarsPriceMax: mockGuitar.price,
    guitarTypeListWithStrings: getGuitarTypeListWithStrings([mockGuitar]),
  },
  DATASEARCH: {
    searchGuitars: [mockGuitar],
    searchGuitarsLoading: StatusLoading.Succeeded,
  },
  DATAGUITARBYID: {
    guitarById: mockGuitar,
  },
  DATAREVIEWS: {
    reviews: [mockReview],
  },
  DATAREVIEWPOST: {
    postReviewLoading: StatusLoading.Succeeded,
  },
});

jest.mock('react-router-dom', async() => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/guitars/1',
  }),
}));

const register = jest.fn();

describe('Component: ReviewAddStarRating', () => {
  it('should render correctly', async () => {
    const mockKey = mockReview.rating;

    render(
      <Provider store={store}>
        <ReviewAddStarRating
          key={mockKey}
          rating={mockKey}
          title={titleRating[mockKey]}
          {...register(ReviewPostField.Rating, {
            required: ValidationMessage.markerRating,
          })}
        />
      </Provider>,
    );

    expect(screen.getByTestId(`star-${mockKey}`)).not.toBeChecked();
    userEvent.click(screen.getByTestId(`star-${mockKey}`));
    expect(screen.getByTestId(`star-${mockKey}`)).toBeChecked();
  });

});
