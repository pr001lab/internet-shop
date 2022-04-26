import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import thunk from 'redux-thunk';
import {StatusLoading} from '../../const';
import {mockGuitar, mockReview} from '../../utils/mocks';
import {getGuitarTypeListWithStrings} from '../../utils/utils';
import CartAddModal, {CartButtonName} from './cart-add-modal';

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

describe('Component: CatalogSort', () => {
  it('should render correctly', () => {
    const textPage = 'Добавить товар в корзину';
    const mockHandleSuccessModalOpened = jest.fn();
    const mockHandleCloseBtn = jest.fn();

    render(
      <Provider store={store}>
        <Router history={history}>
          <CartAddModal
            guitar={mockGuitar}
            onSuccessModalOpen={mockHandleSuccessModalOpened}
            onCloseBtn={mockHandleCloseBtn}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(new RegExp(textPage, 'i')))
      .toBeInTheDocument();
    expect(screen.getByRole('button', {name: CartButtonName.CartAdd}))
      .toBeInTheDocument();
  });

});
