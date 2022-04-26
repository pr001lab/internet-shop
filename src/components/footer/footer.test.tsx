import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import thunk from 'redux-thunk';
import {StatusLoading} from '../../const';
import {mockGuitar} from '../../utils/mocks';
import {getGuitarTypeListWithStrings} from '../../utils/utils';
import Footer from './footer';

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

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const textAbout = 'О нас';
    const textToBuy = 'Где купить?';
    const textBlog = 'Блог';
    const textQuestionAnswer = 'Вопрос - ответ';
    const textReturn = 'Возврат';
    const textServices = 'Сервис-центры';
    const textContacts = 'Контакты';

    render(
      <Provider store={store}>
        <Router history={history}>
          <Footer />
        </Router>
      </Provider>,
    );

    expect(screen.getAllByRole('link')).toHaveLength(10);
    expect(screen.getByRole('link', {name: textToBuy})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: textBlog})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: textQuestionAnswer})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: textReturn})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: textServices})).toBeInTheDocument();
    expect(screen.getByText(new RegExp(textAbout, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(textContacts, 'i'))).toBeInTheDocument();
  });

});
