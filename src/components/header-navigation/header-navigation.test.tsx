import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import thunk from 'redux-thunk';
import {StatusLoading} from '../../const';
import {mockGuitar} from '../../utils/mocks';
import {getGuitarTypeListWithStrings} from '../../utils/utils';
import HeaderNavigation, {HeaderNavigationLink} from './header-navigation';

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

describe('Component: HeaderNavigation', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <HeaderNavigation />
        </Router>
      </Provider>,
    );

    expect(screen.getAllByRole('link')).toHaveLength(3);
    expect(screen.getByRole('link', {name: HeaderNavigationLink.Catalog.title}))
      .toBeInTheDocument();
    expect(screen.getByRole('link', {name: HeaderNavigationLink.WhereToBuy.title}))
      .toBeInTheDocument();
    expect(screen.getByRole('link', {name: HeaderNavigationLink.About.title}))
      .toBeInTheDocument();
  });

});
