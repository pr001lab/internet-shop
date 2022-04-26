import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import thunk from 'redux-thunk';
import {StatusLoading} from '../../const';
import {mockGuitar} from '../../utils/mocks';
import {getGuitarTypeListWithStrings} from '../../utils/utils';
import CatalogFilterStringCount from './catalog-filter-string-count';


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

describe('Component: CatalogFilterStringCount', () => {
  it('should render correctly', () => {
    const textPage = 'Количество струн';
    const mockStringCount = mockGuitar.stringCount;

    render(
      <Provider store={store}>
        <Router history={history}>
          <CatalogFilterStringCount
            stringCounts={[mockStringCount]}
            isChange
            onStringCountChange={jest.fn()}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(new RegExp(textPage, 'i')))
      .toBeInTheDocument();
    expect(screen.getByText(new RegExp(String(mockStringCount), 'i')))
      .toBeInTheDocument();
  });

  it('should called onChange when user choose checkbox', () => {
    const onChange = jest.fn();
    const mockStringCount = mockGuitar.stringCount;
    history.push('/catalog/page_1?type=electric&stringCount=7');

    render(
      <Provider store={store}>
        <Router history={history}>
          <CatalogFilterStringCount
            stringCounts={[mockStringCount]}
            isChange
            onStringCountChange={onChange}
          />
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toBeCalled();
  });

});
