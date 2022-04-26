import {MouseEvent} from 'react';
import {Link} from 'react-router-dom';
import {GuitarType} from '../../types/guitar';
import {formatter, getPreviewImg} from '../../utils/utils';
import CardRate from '../card-rate/card-rate';
import ProductDetailsTabs from '../product-details-tabs/product-details-tabs';

export const enum CartButtonName {
  CartAdd = 'Добавить в корзину',
}

type ComponentProps = {
  guitar: GuitarType;
  onModalOpenedLinkClick: (evt: MouseEvent<HTMLAnchorElement>) => void;
}

function ProductDetails({guitar, onModalOpenedLinkClick}: ComponentProps): JSX.Element {

  const {comments, previewImg, name, price, rating} = guitar;

  return (
    <div className="product-container">
      <img
        className="product-container__img"
        src={`/${getPreviewImg(previewImg)}`}
        width="90"
        height="235"
        alt=""
      />
      <div className="product-container__info-wrapper">
        <h2 className="product-container__title title title--big title--uppercase">
          {name}
        </h2>
        <CardRate
          rating={rating}
          countRating={comments.length}
          width={14}
          height={14}
        />
        <ProductDetailsTabs guitar={guitar} />
      </div>
      <div className="product-container__price-wrapper">
        <p
          className="product-container__price-info product-container__price-info--title"
        >
            Цена:
        </p>
        <p
          className="product-container__price-info product-container__price-info--value"
        >
          {formatter.format(price)}
        </p>
        <Link
          className="button button--red button--big product-container__button"
          to="/#"
          onClick={onModalOpenedLinkClick}
        >
          {CartButtonName.CartAdd}
        </Link>
      </div>
    </div>
  );
}

export default ProductDetails;
