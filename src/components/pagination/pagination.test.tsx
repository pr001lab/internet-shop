import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Route, Router, Switch} from 'react-router-dom';
import thunk from 'redux-thunk';
import {AppRoute, PaginationButton, StatusLoading} from '../../const';
import {mockGuitar} from '../../utils/mocks';
import {getGuitarTypeListWithStrings} from '../../utils/utils';
import Pagination from './pagination';

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

describe('Component: Pagination', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <Router history={history}>
          <Pagination />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(PaginationButton.Next))
      .toBeInTheDocument();
  });

  it('should redirect to url when user clicked to link', () => {
    history.push('/fake');
    const textPage = 'Pagination redirect page';
    const linkCount = 2;

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={`${AppRoute.Catalog}${linkCount}`}>
              <h1>{textPage}</h1>
            </Route>
            <Route>
              <Pagination />
            </Route>
          </Switch>
        </Router>
      </Provider>);

    expect(screen.queryByText(new RegExp(textPage, 'i'))).not.toBeInTheDocument();

    userEvent.click(screen.getAllByRole('link')[linkCount]);

    expect(screen.getByText(new RegExp(textPage, 'i'))).toBeInTheDocument();
  });

});
