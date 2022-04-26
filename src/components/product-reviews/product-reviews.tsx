import {MouseEvent, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import {COUNT_REVIEWS} from '../../const';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import {fetchReviewsAction} from '../../store/dataReviews/api-actions';
import {selectReviews} from '../../store/dataReviews/selectors';
import ProductReviewsList from '../product-reviews-list/product-reviews-list';
import ReviewAddModal from '../review-add-modal/review-add-modal';
import ReviewSuccessModal from '../review-success-modal/review-success-modal';

const EMPTY_REVIEWS_LIST_MESSAGE = 'Отзывов пока нет. Добавьте свой:)';

export const enum ReviewsButtonName {
  PostReview = 'Оставить отзыв',
  ShowMore = 'Показать еще отзывы',
  Up = 'Наверх',
}

function ProductReviews(): JSX.Element {
  const dispatch = useDispatch();
  const scrollItemRef = useRef(null);
  const reviews = useSelector(selectReviews);
  const [countReviews, setCountReviews] = useState<number>(COUNT_REVIEWS);
  const [fetching, setFetching] = useState<boolean>(true);
  const [reviewAddModalOpened, setReviewAddModalOpened] = useState(false);
  const [reviewSuccessModalOpened, setReviewSuccessModalOpened] = useState(false);

  const {id: guitarId} = useParams <{id: string}>();

  const handleKeyDown = (key: KeyboardEvent) => {
    if (key.code === 'Escape') {
      setReviewAddModalOpened(false);
      setReviewSuccessModalOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  useEffect(() => {
    if (fetching) {
      dispatch(fetchReviewsAction(guitarId));
      setFetching(false);
    }
  }, [dispatch, fetching, guitarId]);

  const handleFetchingChange = (fetchingChange: boolean) => {
    setFetching(fetchingChange);
  };

  const handleReviewAddModalOpened = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    setReviewAddModalOpened(true);
  };

  const handleReviewSuccessModalOpened = () => {
    setReviewSuccessModalOpened(true);
  };

  const handleReviewAddModalCloseBtn = () => {
    setReviewAddModalOpened(false);
  };

  const handleReviewSucccessModalCloseBtn = () => {
    setReviewSuccessModalOpened(false);
  };

  function loadData() {
    if (countReviews < reviews.length) {
      setCountReviews(countReviews + COUNT_REVIEWS);
    }
  }

  useIntersectionObserver(scrollItemRef, loadData);

  return (
    <>
      <section className="reviews">
        <h3 className="reviews__title title title--bigger">
          Отзывы
        </h3>
        <Link
          className="button button--red-border button--big reviews__sumbit-button"
          to="/#"
          onClick={handleReviewAddModalOpened}
        >
          {ReviewsButtonName.PostReview}
        </Link>
        {reviews.length > 0 && (
          <ProductReviewsList
            reviews={reviews}
            countReviews={countReviews}
          />
        )}
        {reviews.length <= 0 && EMPTY_REVIEWS_LIST_MESSAGE}

        {reviews.length > countReviews && reviews.length > 0 && (
          <button
            className="button button--medium reviews__more-button"
            onClick={() => setCountReviews(countReviews + COUNT_REVIEWS)}
          >
            {ReviewsButtonName.ShowMore}
          </button>
        )}

        <a
          className="button button--up button--red-border button--big reviews__up-button"
          style={{zIndex: 1}}
          href={'#header'}
          ref={scrollItemRef}
        >
          {ReviewsButtonName.Up}
        </a>
      </section>
      {reviewAddModalOpened && (
        <ReviewAddModal
          onCloseBtn={handleReviewAddModalCloseBtn}
          onFetchingChange={handleFetchingChange}
          onReviewSuccessModalOpen={handleReviewSuccessModalOpened}
        />
      )}
      {reviewSuccessModalOpened && (
        <ReviewSuccessModal
          onCloseBtn={handleReviewSucccessModalCloseBtn}
        />
      )}
    </>
  );
}

export default ProductReviews;
