import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import thunk from 'redux-thunk';
import {SortButtonName, StatusLoading} from '../../const';
import {mockGuitar} from '../../utils/mocks';
import {getGuitarTypeListWithStrings} from '../../utils/utils';
import CatalogSort from './catalog-sort';

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

describe('Component: CatalogSort', () => {
  it('should render correctly', () => {
    const textPage = 'Сортировать:';

    render(
      <Provider store={store}>
        <Router history={history}>
          <CatalogSort />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(new RegExp(textPage, 'i')))
      .toBeInTheDocument();
    expect(screen.getByRole('button', {name: SortButtonName.Price}))
      .toBeInTheDocument();
    expect(screen.getByRole('button', {name: SortButtonName.Rating}))
      .toBeInTheDocument();
    expect(screen.getByRole('button', {name: SortButtonName.Asc}))
      .toBeInTheDocument();
    expect(screen.getByRole('button', {name: SortButtonName.Desc}))
      .toBeInTheDocument();
  });

});
