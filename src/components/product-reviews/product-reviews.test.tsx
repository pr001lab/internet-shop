import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import thunk from 'redux-thunk';
import {StatusLoading} from '../../const';
import {mockGuitar, mockReview, mockReview2, mockReview3, mockReview4} from '../../utils/mocks';
import {getGuitarTypeListWithStrings} from '../../utils/utils';
import ProductReviews, {ReviewsButtonName} from './product-reviews';

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
    reviews: [mockReview, mockReview2, mockReview3, mockReview4],
  },
});

const history = createMemoryHistory();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/guitars/1',
  }),
}));

jest.mock('../../hooks/useIntersectionObserver', () => jest.fn());

describe('Component: ProductReviews', () => {
  it('should render correctly', () => {
    const headingComponent = 'Отзывы';
    render(
      <Provider store={store}>
        <Router history={history}>
          <ProductReviews />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(headingComponent))
      .toBeInTheDocument();

    expect(screen.getByRole('link', {name: ReviewsButtonName.PostReview}))
      .toBeInTheDocument();
    expect(screen.getByRole('button', {name: ReviewsButtonName.ShowMore}))
      .toBeInTheDocument();
    expect(screen.getByRole('link', {name: ReviewsButtonName.Up}))
      .toBeInTheDocument();
  });

});
