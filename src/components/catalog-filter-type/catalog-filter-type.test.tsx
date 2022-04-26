import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import thunk from 'redux-thunk';
import {FilterDictionary, StatusLoading} from '../../const';
import {mockGuitar} from '../../utils/mocks';
import {getGuitarTypeListWithStrings} from '../../utils/utils';
import CatalogFilterType from './catalog-filter-type';

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

describe('Component: CatalogFilterType', () => {
  it('should render correctly', () => {
    const textPage = 'Тип гитар';
    const mockGuitarType = FilterDictionary[mockGuitar.type];

    render(
      <Provider store={store}>
        <Router history={history}>
          <CatalogFilterType
            onGuitarTypeChange={jest.fn()}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(new RegExp(textPage, 'i')))
      .toBeInTheDocument();
    expect(screen.getByRole('checkbox', {name: mockGuitarType}))
      .toBeInTheDocument();
  });

  it('should called onChange when user choose checkbox', () => {
    const onChange = jest.fn();

    render(
      <Provider store={store}>
        <Router history={history}>
          <CatalogFilterType
            onGuitarTypeChange={onChange}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('checkbox')).not.toBeChecked();
    userEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

});
