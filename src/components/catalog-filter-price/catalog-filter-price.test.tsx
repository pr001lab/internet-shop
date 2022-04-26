import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import thunk from 'redux-thunk';
import {FieldNames, StatusLoading} from '../../const';
import {mockGuitar} from '../../utils/mocks';
import {getGuitarTypeListWithStrings} from '../../utils/utils';
import CatalogFilterPrice from './catalog-filter-price';

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
});

const history = createMemoryHistory();

describe('Component: CatalogFilterPrice', () => {
  it('should render correctly', () => {
    const textPage = 'Цена, ₽';

    render(
      <Provider store={store}>
        <Router history={history}>
          <CatalogFilterPrice />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(new RegExp(textPage, 'i')))
      .toBeInTheDocument();

  });

  it('should render correctly when user input into PriceMin field', () => {
    const textType = '20000';

    render(
      <Provider store={store}>
        <Router history={history}>
          <CatalogFilterPrice />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId(FieldNames.PriceMin)).toBeInTheDocument();

    userEvent
      .type(screen.getByTestId(FieldNames.PriceMin), (
        textType
      ));
    expect(screen.getByDisplayValue(
      new RegExp(textType, 'i'),
    )).toBeInTheDocument();
  });

  it('should render correctly when user input into PriceMax field', () => {
    const textType = '25000';

    render(
      <Provider store={store}>
        <Router history={history}>
          <CatalogFilterPrice />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId(FieldNames.PriceMax)).toBeInTheDocument();

    userEvent
      .type(screen.getByTestId(FieldNames.PriceMax), (
        textType
      ));
    expect(screen.getByDisplayValue(
      new RegExp(textType, 'i'),
    )).toBeInTheDocument();
  });

});
