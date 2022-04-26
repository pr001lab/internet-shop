import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import thunk from 'redux-thunk';
import {StatusLoading} from '../../const';
import {mockGuitar} from '../../utils/mocks';
import {getGuitarTypeListWithStrings} from '../../utils/utils';
import FooterNavigation from './footer-navigation';

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

describe('Component: FooterNavigation', () => {
  it('should render correctly', () => {
    const textToBuy = 'Где купить?';
    const textBlog = 'Блог';
    const textQuestionAnswer = 'Вопрос - ответ';
    const textReturn = 'Возврат';
    const textServices = 'Сервис-центры';

    render(
      <Provider store={store}>
        <Router history={history}>
          <FooterNavigation />
        </Router>
      </Provider>,
    );

    expect(screen.getAllByRole('link')).toHaveLength(5);
    expect(screen.getByRole('link', {name: textToBuy})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: textBlog})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: textQuestionAnswer})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: textReturn})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: textServices})).toBeInTheDocument();
  });

});
