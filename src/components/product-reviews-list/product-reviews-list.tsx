import {RatingComponent} from '../../const';
import {ReviewType} from '../../types/review';
import {formatterDate} from '../../utils/utils';
import CardRate from '../card-rate/card-rate';

const RatingParameter = {
  defaultWidth: 16,
  defaultHeight: 16,
} as const;

export enum TitleReview {
  HeadingForm = 'Оставить отзыв',
  UserName = 'Ваше Имя',
  Rating = 'Ваша Оценка',
  Advantage = 'Достоинства',
  Disadvantage = 'Недостатки',
  Comment = 'Комментарий',
}

const sortDownDate = (
  firstItem: ReviewType,
  secondItem: ReviewType,
) => Date.parse(secondItem.createAt) - Date.parse(firstItem.createAt);

type ComponentProps = {
  reviews: ReviewType[],
  countReviews: number,
}

function ProductReviewsList(
  {
    reviews,
    countReviews,
  }: ComponentProps): JSX.Element {

  return (
    <>
      {
        reviews
          .slice()
          .sort(sortDownDate)
          .slice(0, countReviews)
          .map((review, index) => {
            const {
              id,
              userName,
              createAt,
              rating,
              advantage,
              disadvantage,
              comment,
            } = review;

            return (
              <div
                key={id}
                className="review"
              >
                <div className="review__wrapper">
                  <h4 className="review__title review__title--author title title--lesser">
                    {userName}
                  </h4>
                  <span className="review__date">
                    {formatterDate.format(new Date(createAt))}
                  </span>
                </div>
                <CardRate
                  rating={rating}
                  width={RatingParameter.defaultWidth}
                  height={RatingParameter.defaultHeight}
                  typeRating={RatingComponent.Review}
                />
                <h4 className="review__title title title--lesser">
                  {TitleReview.Advantage}:
                </h4>
                <p className="review__value">
                  {advantage}
                </p>
                <h4 className="review__title title title--lesser">
                  {TitleReview.Disadvantage}:
                </h4>
                <p className="review__value">
                  {disadvantage}
                </p>
                <h4 className="review__title title title--lesser">
                  {TitleReview.Comment}:
                </h4>
                <p className="review__value">
                  {comment}
                </p>
              </div>
            );
          })
      }
    </>
  );
}

export default ProductReviewsList;
