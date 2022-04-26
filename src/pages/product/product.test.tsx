import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import thunk from 'redux-thunk';
import {StatusLoading} from '../../const';
import {mockGuitar, mockReview} from '../../utils/mocks';
import {getGuitarTypeListWithStrings} from '../../utils/utils';
import Product from './product';

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
  DATACART: {
    cartProducts: [mockGuitar],
  },
});

const history = createMemoryHistory();

jest.mock('../../hooks/useIntersectionObserver', () => jest.fn());

describe('Component: Product', () => {
  it('should render correctly', () => {
    const textPage = 'Характеристики';

    render(
      <Provider store={store}>
        <Router history={history}>
          <Product />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('link', {name: new RegExp(textPage, 'i')}))
      .toBeInTheDocument();
  });

});
