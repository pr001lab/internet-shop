import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import thunk from 'redux-thunk';
import {StatusLoading} from '../../const';
import {mockGuitar} from '../../utils/mocks';
import {getGuitarTypeListWithStrings, getKeyByValue} from '../../utils/utils';
import FooterSocials, {footerSocialLinks} from './footer-socials';

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

describe('Component: FooterSocials', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <FooterSocials />
        </Router>
      </Provider>,
    );

    expect(screen.getAllByRole('link')).toHaveLength(3);
    expect(screen.getByRole('link', {
      name: getKeyByValue(footerSocialLinks, footerSocialLinks.facebook),
    }))
      .toHaveAttribute('href', footerSocialLinks.facebook);
    expect(screen.getByRole('link', {
      name: getKeyByValue(footerSocialLinks, footerSocialLinks.instagram),
    }))
      .toHaveAttribute('href', footerSocialLinks.instagram);
    expect(screen.getByRole('link', {
      name: getKeyByValue(footerSocialLinks, footerSocialLinks.twitter),
    }))
      .toHaveAttribute('href', footerSocialLinks.twitter);
  });

});
