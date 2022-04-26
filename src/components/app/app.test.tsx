import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import thunk from 'redux-thunk';
import {APIRoute, AppRoute, StatusLoading} from '../../const';
import {createAPI} from '../../services/api';
import {mockGuitar, mockReview} from '../../utils/mocks';
import {getGuitarTypeListWithStrings} from '../../utils/utils';
import App from './app';

const mockGuitarsCount = '27';
const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore(middlewares);

jest.mock('../../hooks/useIntersectionObserver', () => jest.fn());

describe('Component: App', () => {
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

  const headers = {
    'x-total-count': mockGuitarsCount,
  };

  mockAPI
    .onGet(APIRoute.Guitars)
    .reply(200, [mockGuitar], headers);

  const history = createMemoryHistory();

  const fakeApp = (
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );

  it('should render Main page when user navgate to "/"', () => {
    const textSearch = 'Каталог гитар';
    render(fakeApp);

    expect(screen.getByText(new RegExp(textSearch, 'i'))).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(5);
    expect(screen.getAllByRole('textbox')).toHaveLength(3);
    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
    expect(screen.getAllByRole('link')).toHaveLength(23);
  });

  it('should render Product page when user navgate to "/guitars/id"', () => {
    history.push(`${AppRoute.Product}/1`);
    render(fakeApp);

    expect(screen.getByRole('link', {name: 'Характеристики'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Описание'})).toBeInTheDocument();
  });

  it('should render NotFound page when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText(/К сожалению, ничего не найдено/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться на главную страницу/i)).toBeInTheDocument();
  });

});
