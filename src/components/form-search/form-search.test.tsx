import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import * as Redux from 'react-redux';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import thunk from 'redux-thunk';
import {StatusLoading} from '../../const';
import {mockGuitar} from '../../utils/mocks';
import {getGuitarTypeListWithStrings} from '../../utils/utils';
import FormSearch from './form-search';

const mockGuitarsCount = 27;
const mockStore = configureMockStore([thunk.withExtraArgument({
  get: () => [mockGuitar],
})]);

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

describe('Component: FormSearch', () => {
  it('should render correctly when user input into form Search', () => {
    const history = createMemoryHistory();
    const mockPush = jest.spyOn(history, 'push');

    const textPlaceholder = 'что вы ищите?';
    const textSearch = 'Честер';

    render(
      <Provider store={store}>
        <Router history={history}>
          <FormSearch />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('button').textContent).toBe('Начать поиск');
    expect(screen.getByPlaceholderText(new RegExp(textPlaceholder, 'i'))).toBeInTheDocument();

    userEvent
      .type(screen.getByTestId('textbox'), (
        textSearch
      ));
    expect(screen.getByDisplayValue(
      new RegExp(textSearch, 'i'),
    )).toBeInTheDocument();
    const element = screen.getByTestId(mockGuitar.id);
    expect(element).toBeInTheDocument();

    expect(mockPush).not.toHaveBeenCalled();
    userEvent.click(element);
    expect(mockPush).toBeCalledTimes(1);
  });

  it('should submit form when user clicked to submit-button', () => {
    const history = createMemoryHistory();
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <FormSearch />
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByRole('button'));
    expect(dispatch).toBeCalledTimes(1);
  });

});
