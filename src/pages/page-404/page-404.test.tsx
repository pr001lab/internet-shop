import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Route, Router, Switch} from 'react-router-dom';
import thunk from 'redux-thunk';
import {StatusLoading} from '../../const';
import {mockGuitar} from '../../utils/mocks';
import {getGuitarTypeListWithStrings} from '../../utils/utils';
import Page404 from './page-404';

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

describe('Component: Page404', () => {
  it('should render correctly', () => {
    const textMainPage = 'Вернуться на главную страницу';
    const textPage = 'К сожалению, ничего не найдено';

    render(
      <Provider store={store}>
        <Router history={history}>
          <Page404 />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(new RegExp(textPage, 'i'))).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(2);
    expect(screen.getByRole('link', {name: textMainPage})).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link "/"', () => {
    history.push('/fake');
    const textMainPageReturn = 'Вернуться на главную страницу';
    const textMainPage = 'Main page';

    render(
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <h1>{textMainPage}</h1>
          </Route>
          <Route>
            <Page404 />
          </Route>
        </Switch>
      </Router>,
    );

    expect(screen.queryByText(new RegExp(textMainPage, 'i'))).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link', {name: textMainPageReturn}));
    expect(screen.getByText(new RegExp(textMainPage, 'i'))).toBeInTheDocument();
  });

});
