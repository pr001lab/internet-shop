import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {StatusLoading} from '../../const';
import {mockGuitar, mockReview} from '../../utils/mocks';
import {getGuitarTypeListWithStrings} from '../../utils/utils';
import ReviewSuccessModal, {ReviewSuccessButtonName} from './review-success-modal';

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
  DATAGUITARBYID: {
    guitarById: mockGuitar,
  },
  DATAREVIEWS: {
    reviews: [mockReview],
  },
  DATAREVIEWPOST: {
    postReviewLoading: StatusLoading.Succeeded,
  },
});

jest.mock('react-router-dom', async() => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/guitars/1',
  }),
}));

describe('Component: ReviewSuccessModal', () => {
  it('should render correctly', async () => {
    const mockHandleReviewSucccessModalCloseBtn = jest.fn();
    const headingForm = 'Спасибо за ваш отзыв!';

    render(
      <Provider store={store}>
        <ReviewSuccessModal
          onCloseBtn={mockHandleReviewSucccessModalCloseBtn}
        />
      </Provider>,
    );

    expect(screen.getByText(headingForm))
      .toBeInTheDocument();
    expect(screen.getByRole('button', {name: ReviewSuccessButtonName.ToBuy}))
      .toBeInTheDocument();
  });

});
