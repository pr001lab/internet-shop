/* eslint-disable testing-library/no-node-access */
import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import thunk from 'redux-thunk';
import {StatusLoading} from '../../const';
import {mockGuitar, mockReview} from '../../utils/mocks';
import {getGuitarTypeListWithStrings} from '../../utils/utils';
import ProductDetails, {CartButtonName} from './product-details';

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

describe('Component: ProductDetails', () => {
  it('should render correctly', () => {
    const mockHandleModalOpenedLinkClick = jest.fn();

    const {container} = render(
      <Provider store={store}>
        <Router history={history}>
          <ProductDetails
            guitar={mockGuitar}
            onModalOpenedLinkClick={mockHandleModalOpenedLinkClick}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(mockGuitar.name))
      .toBeInTheDocument();
    expect(screen.getByRole('link', {name: CartButtonName.CartAdd}))
      .toBeInTheDocument();

    // eslint-disable-next-line testing-library/no-container
    const svgFullStar = container
      .querySelectorAll('[xlink\\:href="#icon-full-star"]');
    // eslint-disable-next-line testing-library/no-container
    const svgEmptyStar = container
      .querySelectorAll('[xlink\\:href="#icon-star"]');

    expect(svgFullStar).toHaveLength(4);
    expect(svgEmptyStar).toHaveLength(1);
  });

});
