import cn from 'classnames';
import {useEffect, useRef} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardName, ReviewPostField, StatusLoading} from '../../const';
import {selectGuitarById} from '../../store/dataGuitarById/selectors';
import {postReviewIdle} from '../../store/dataReviewPost/actions';
import {postReviewAction} from '../../store/dataReviewPost/api-actions';
import {selectPostReviewLoading} from '../../store/dataReviewPost/selectors';
import {ReviewPostType} from '../../types/review';
import {TitleReview} from '../product-reviews-list/product-reviews-list';
import ReviewAddStarRating from '../review-add-star-rating/review-add-star-rating';
import styles from './review-add-modal.module.css';

const FORM_EMPTY_USER_MESSAGE = 'Данные не предоставлены';
export const enum ReviewAddModalButtonTitle {
  SubmitReview = 'Отправить отзыв',
}

export const ValidationMessage = {
  requiredField: 'Заполните поле',
  markerRating: 'Поставьте оценку',
} as const;

export const titleRating: {[key: number]: string} = {
  1: 'Ужасно',
  2: 'Плохо',
  3: 'Нормально',
  4: 'Хорошо',
  5: 'Отлично',
} as const;

type ComponentProps = {
  onCloseBtn: () => void;
  onFetchingChange: (fetching: boolean) => void,
  onReviewSuccessModalOpen: () => void;
}

type FormValues = ReviewPostType;

function ReviewAddModal({
  onCloseBtn,
  onFetchingChange,
  onReviewSuccessModalOpen}: ComponentProps): JSX.Element {
  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
  } = useForm<FormValues>({
    mode: 'onSubmit',
  });
  const dispatch = useDispatch();
  const refDivModalContent = useRef<HTMLDivElement>(null);
  const refFirstElement = useRef<HTMLInputElement | null>(null);
  const refLastElement = useRef<HTMLButtonElement>(null);
  const guitar = useSelector(selectGuitarById);
  const postReviewLoading = useSelector(selectPostReviewLoading);

  useEffect(() => {
    refFirstElement.current?.focus();
  }, []);

  const handleFirstElementTabKeyDown = (evt: KeyboardEvent) => {
    if (evt.shiftKey && evt.code === KeyboardName.Tab) {
      refLastElement.current?.focus();
      evt.preventDefault();
    }
  };

  const handleLastElementTabKeyDown = (evt: KeyboardEvent) => {
    if (!evt.shiftKey && evt.code === KeyboardName.Tab) {
      refFirstElement.current?.focus();
      evt.preventDefault();
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  });

  useEffect(() => {
    function handleClickOutside(evt: any) {
      if (refDivModalContent.current && !refDivModalContent.current.contains(evt.target)) {
        onCloseBtn();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onCloseBtn]);

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === KeyboardName.Escape) {
        onCloseBtn();
      }
    }

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [onCloseBtn]);

  useEffect(() => {
    if (postReviewLoading === StatusLoading.Succeeded) {
      onCloseBtn();
      dispatch(postReviewIdle());
      onFetchingChange(true);
      onReviewSuccessModalOpen();
    }
  }, [dispatch, onCloseBtn, onFetchingChange, onReviewSuccessModalOpen, postReviewLoading]);

  const handleFormSubmit: SubmitHandler<FormValues> = (data: {[key: string]: string | number}) => {
    Object.keys(data).forEach((key) => {
      if (data[key] === '') {
        data[key] = FORM_EMPTY_USER_MESSAGE;
      }
      return data[key];
    });

    if (guitar) {
      data.guitarId = guitar.id;
      data.rating = Number(data.rating);
    }

    dispatch(postReviewAction(data as ReviewPostType));
  };

  const clsRateReverse = cn('rate rate--reverse', styles.flexDirectionRow);

  const {ref, ...rest} = register(ReviewPostField.UserName, {
    required: ValidationMessage.requiredField,
  });

  return (
    <div style={{position: 'relative', width: 550, height: 610, marginBottom: 50}}>
      <div className="modal is-active modal--review modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal></div>
          <div
            className="modal__content"
            ref={refDivModalContent}
          >
            <h2 className="modal__header modal__header--review title title--medium">
              {TitleReview.HeadingForm}
            </h2>
            <h3 className="modal__product-name title title--medium-20 title--uppercase">
              {guitar?.name}
            </h3>
            <form
              className="form-review"
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              <div className="form-review__wrapper">
                <div className="form-review__name-wrapper">
                  <label
                    className="form-review__label form-review__label--required"
                    htmlFor="user-name"
                  >
                    {TitleReview.UserName}
                  </label>
                  <input
                    className="form-review__input form-review__input--name"
                    id="user-name"
                    type="text"
                    autoComplete="off"
                    {...rest}
                    ref={(e) => {
                      ref(e);
                      refFirstElement.current = e;
                    }}
                    onKeyDown={(evt: any) => handleFirstElementTabKeyDown(evt)}
                  />
                  <span className="form-review__warning">
                    {errors?.userName && errors?.userName.message}
                  </span>
                </div>
                <div>
                  <span className="form-review__label form-review__label--required">
                    {TitleReview.Rating}
                  </span>
                  <div dir="rtl" className={clsRateReverse}>
                    {Object.entries(titleRating).reverse().map(([key, value]) => (
                      <ReviewAddStarRating
                        key={key}
                        rating={key}
                        title={value}
                        {...register(ReviewPostField.Rating, {
                          required: ValidationMessage.markerRating,
                        })}
                      />
                    ))}
                    <span className="rate__count"></span>
                    <span className="rate__message">
                      {errors?.rating && errors?.rating.message}
                    </span>
                  </div>
                </div>
              </div>
              <label className="form-review__label" htmlFor="advantage">
                {TitleReview.Advantage}
              </label>
              <input
                className="form-review__input"
                id="advantage"
                type="text"
                autoComplete="off"
                {...register('advantage')}
              />
              <label className="form-review__label" htmlFor="disadvantage">
                {TitleReview.Disadvantage}
              </label>
              <input
                className="form-review__input"
                id="disadvantage"
                type="text"
                autoComplete="off"
                {...register('disadvantage')}
              />
              <label
                className="form-review__label"
                htmlFor="comment"
              >
                {TitleReview.Comment}
              </label>
              <textarea
                className="form-review__input form-review__input--textarea"
                id="comment"
                rows={10}
                autoComplete="off"
                {...register('comment')}
              >
              </textarea>
              <button
                className="button button--medium-20 form-review__button"
                type="submit"
              >
                {ReviewAddModalButtonTitle.SubmitReview}
              </button>
            </form>
            <button
              className="modal__close-btn button-cross"
              type="button"
              aria-label="Закрыть"
              onClick={onCloseBtn}
              ref={refLastElement}
              onKeyDown={(evt: any) => handleLastElementTabKeyDown(evt)}
            >
              <span className="button-cross__icon"></span>
              <span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewAddModal;
