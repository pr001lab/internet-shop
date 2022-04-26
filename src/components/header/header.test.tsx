import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import thunk from 'redux-thunk';
import {StatusLoading} from '../../const';
import {mockGuitar} from '../../utils/mocks';
import {getGuitarTypeListWithStrings} from '../../utils/utils';
import Header from './header';

const mockGuitarsCount = 27;
const mockStore = configureMockStore([thunk]);

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
});

const history = createMemoryHistory();

describe('Component: Header', () => {
  it('should render correctly', () => {
    const textCatalog = 'Каталог';
    const textToBuy = 'Где купить?';
    const textAbout = 'О компании';
    const textCart = 'Корзина';

    render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>,
    );

    expect(screen.getAllByRole('link')).toHaveLength(5);
    expect(screen.getByRole('link', {name: textCatalog})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: textToBuy})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: textAbout})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: textCart})).toBeInTheDocument();
  });

});
