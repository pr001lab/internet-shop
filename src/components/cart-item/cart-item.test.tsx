import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import thunk from 'redux-thunk';
import {APIRoute, StatusLoading} from '../../const';
import {createAPI} from '../../services/api';
import {mockCouponValue, mockGuitar, mockGuitarWithQuantity} from '../../utils/mocks';
import {getGuitarTypeListWithStrings} from '../../utils/utils';
import CartItem from './cart-item';

const mockGuitarsCount = '27';
const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore(middlewares);

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
  DATACART: {
    cartProducts: [mockGuitar],
  },
  DATACOUPONPOST: {
    postCoupon: mockCouponValue,
  },
});

mockAPI
  .onGet(APIRoute.Guitars)
  .reply(200, [mockGuitar]);

const history = createMemoryHistory();

describe('Component: CartItem', () => {
  it('should render correctly', () => {
    const textHeading = mockGuitarWithQuantity.name;
    const mockOnProductRemoveBtnClick = jest.fn();

    render(
      <Provider store={store}>
        <Router history={history}>
          <CartItem
            key={mockGuitarWithQuantity.id}
            product={mockGuitarWithQuantity}
            onProductRemoveBtnClick={mockOnProductRemoveBtnClick}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(new RegExp(textHeading, 'i'))).toBeInTheDocument();
  });

});
