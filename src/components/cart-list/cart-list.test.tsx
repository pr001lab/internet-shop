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
import CartList from './cart-list';

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

describe('Component: CartList', () => {
  it('should render correctly', () => {
    const textHeading = 'Введите свой промокод, если он у вас есть.';
    const mockHandleProductRemoveBtnClick = jest.fn();

    render(
      <Provider store={store}>
        <Router history={history}>
          <CartList
            cartProducts={{1: mockGuitarWithQuantity}}
            onProductRemoveBtnClick={mockHandleProductRemoveBtnClick}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(new RegExp(textHeading, 'i'))).toBeInTheDocument();
  });

});
