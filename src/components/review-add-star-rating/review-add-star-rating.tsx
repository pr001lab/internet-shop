import {forwardRef, LegacyRef} from 'react';

type ComponentProps = {
  rating: string,
  title: string,
}

function ReviewAddStarRating(
  {rating, title, ...props}: ComponentProps,
  ref: LegacyRef<HTMLInputElement> | undefined,
): JSX.Element {
  return (
    <>
      <input
        ref={ref}
        className="visually-hidden"
        type="radio"
        id={`star-${rating}`}
        name="rate"
        value={rating}
        {...props}
        data-testid={`star-${rating}`}
      />
      <label
        className="rate__label"
        htmlFor={`star-${rating}`}
        title={title}
      >
      </label>
    </>
  );
}

export default forwardRef(ReviewAddStarRating);
