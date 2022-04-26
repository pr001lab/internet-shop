import cn from 'classnames';
import {useLocation} from 'react-router-dom';
import {AppRoute, RatingComponent} from '../../const';

const RatingParameter = {
  defaultWidth: 12,
  defaultHeight: 11,
  length: 5,
} as const;

type ComponentProps = {
  rating: number,
  countRating?: number,
  width?: number,
  height?: number,
  typeRating?: string,
};

function CardRate({
  rating,
  countRating,
  width = RatingParameter.defaultWidth,
  height = RatingParameter.defaultHeight,
  typeRating}: ComponentProps): JSX.Element {
  const {pathname} = useLocation();

  const classNameDiv = cn({
    'rate product-card__rate': pathname.includes(AppRoute.Catalog) || pathname.includes(AppRoute.Catalog),
    'rate product-container__rating': pathname.includes(AppRoute.Product),
    'rate review__rating-panel': typeRating === RatingComponent.Review,
  });

  const countRatingWith0 = (countRating !== undefined && countRating > 0) ? countRating : 0;

  return (
    <div className={classNameDiv} aria-hidden="true">
      <span className="visually-hidden">Рейтинг:</span>
      {Array.from({length: RatingParameter.length}, (_, i) => i).map((iconIndex) => {
        const iconStar = rating > iconIndex
          ? '#icon-full-star'
          : '#icon-star';

        return (
          <svg
            width={width}
            height={height}
            aria-hidden="true"
            key={iconIndex}
          >
            <use xlinkHref={iconStar}/>
          </svg>
        );
      })}
      <span className="rate__count">
        {typeRating === RatingComponent.Review
          ? ''
          : countRatingWith0}
      </span>
      <span className="rate__message"></span>
    </div>
  );
}

export default CardRate;
