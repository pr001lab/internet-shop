import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {StatusLoading} from '../../const';
import {mockGuitar, mockReview} from '../../utils/mocks';
import {getGuitarTypeListWithStrings} from '../../utils/utils';
import {TitleReview} from '../product-reviews-list/product-reviews-list';
import ReviewAddModal, {ReviewAddModalButtonTitle, ValidationMessage} from './review-add-modal';

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

describe('Component: ReviewAddModal', () => {
  it('should render correctly', async () => {
    const mockHandleReviewAddModalCloseBtn = jest.fn();
    const mockHandleFetchingChange = jest.fn();
    const mockHandleReviewSuccessModalOpened = jest.fn();

    render(
      <Provider store={store}>
        <ReviewAddModal
          onCloseBtn={mockHandleReviewAddModalCloseBtn}
          onFetchingChange={mockHandleFetchingChange}
          onReviewSuccessModalOpen={mockHandleReviewSuccessModalOpened}
        />
      </Provider>,
    );

    expect(screen.getByRole('heading', {name: TitleReview.HeadingForm}))
      .toBeInTheDocument();
    expect(screen.getByText(TitleReview.UserName))
      .toBeInTheDocument();
    expect(screen.getByText(TitleReview.Rating))
      .toBeInTheDocument();
    expect(screen.getByText(TitleReview.Advantage))
      .toBeInTheDocument();
    expect(screen.getByText(TitleReview.Disadvantage))
      .toBeInTheDocument();
    expect(screen.getByText(TitleReview.Comment))
      .toBeInTheDocument();
    expect(screen.getByRole('button', {name: ReviewAddModalButtonTitle.SubmitReview}))
      .toBeInTheDocument();
  });

  it('calls the onSubmit with valid fields', async () => {
    const mockUserName = 'Kot';
    const mockKey = mockReview.rating;

    const mockHandleReviewAddModalCloseBtn = jest.fn();
    const mockHandleFetchingChange = jest.fn();
    const mockHandleReviewSuccessModalOpened = jest.fn();

    render(
      <Provider store={store}>
        <ReviewAddModal
          onCloseBtn={mockHandleReviewAddModalCloseBtn}
          onFetchingChange={mockHandleFetchingChange}
          onReviewSuccessModalOpen={mockHandleReviewSuccessModalOpened}
        />
      </Provider>,
    );

    userEvent.type(screen.getByLabelText(TitleReview.UserName), mockUserName);
    userEvent.click(screen.getByTestId(`star-${mockKey}`));
    expect(screen.getByTestId(`star-${mockKey}`)).toBeChecked();
    userEvent.click(screen.getByRole('button', {name: ReviewAddModalButtonTitle.SubmitReview}));
    await waitFor(() => {
      expect(mockHandleReviewSuccessModalOpened).toBeCalledTimes(1);
    });
  });

  it('calls the onSubmit with invalid UserName', async () => {
    const mockHandleReviewAddModalCloseBtn = jest.fn();
    const mockHandleFetchingChange = jest.fn();
    const mockHandleReviewSuccessModalOpened = jest.fn();

    render(
      <Provider store={store}>
        <ReviewAddModal
          onCloseBtn={mockHandleReviewAddModalCloseBtn}
          onFetchingChange={mockHandleFetchingChange}
          onReviewSuccessModalOpen={mockHandleReviewSuccessModalOpened}
        />
      </Provider>,
    );

    userEvent
      .type(screen.getByRole('textbox', {name: TitleReview.UserName}), (
        ''
      ));
    userEvent.click(screen.getByRole('button', {name: ReviewAddModalButtonTitle.SubmitReview}));
    await waitFor(() => {
      expect(screen.getByText(ValidationMessage.requiredField))
        .toBeInTheDocument();
    });
  });

});
