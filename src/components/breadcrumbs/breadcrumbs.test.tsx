import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Route, Router, Switch} from 'react-router-dom';
import thunk from 'redux-thunk';
import {AppRoute, StatusLoading} from '../../const';
import {BreadcrumbType} from '../../types/breadcrumb';
import {mockGuitar} from '../../utils/mocks';
import {getGuitarTypeListWithStrings} from '../../utils/utils';
import Breadcrumbs from './breadcrumbs';

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

describe('Component: Breadcrumbs', () => {
  it('should render correctly', () => {
    const textPage = 'Главная';
    const Breadcrumb: BreadcrumbType = {
      Main: {
        link: AppRoute.Main,
      },
    } as const;

    render(
      <Provider store={store}>
        <Router history={history}>
          <Breadcrumbs breadcrumb={Breadcrumb}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(new RegExp(textPage, 'i')))
      .toBeInTheDocument();
  });

  it('should redirect to url when user clicked to link', () => {
    history.push('/fake');
    const textPage = 'Каталог гитар';
    const Breadcrumb: BreadcrumbType = {
      Main: {
        link: AppRoute.Main,
      },
    } as const;

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.Main}>
              <h1>{textPage}</h1>
            </Route>
            <Route>
              <Breadcrumbs breadcrumb={Breadcrumb}/>
            </Route>
          </Switch>
        </Router>
      </Provider>);

    expect(screen.queryByText(new RegExp(textPage, 'i'))).not.toBeInTheDocument();

    userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(new RegExp(textPage, 'i'))).toBeInTheDocument();
  });

});
