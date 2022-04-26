import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import thunk from 'redux-thunk';
import {StatusLoading} from '../../const';
import {mockGuitar, mockReview} from '../../utils/mocks';
import {getGuitarTypeListWithStrings} from '../../utils/utils';
import ProductReviewsList, {TitleReview} from './product-reviews-list';

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
});

const history = createMemoryHistory();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/guitars/1',
  }),
}));

describe('Component: ProductReviewsList', () => {
  const mockCountReviews = 3;
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ProductReviewsList
            reviews={[mockReview]}
            countReviews={mockCountReviews}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('heading', {name: `${TitleReview.Advantage}:`}))
      .toBeInTheDocument();
    expect(screen.getByRole('heading', {name: `${TitleReview.Disadvantage}:`}))
      .toBeInTheDocument();
    expect(screen.getByRole('heading', {name: `${TitleReview.Comment}:`}))
      .toBeInTheDocument();
  });

});
