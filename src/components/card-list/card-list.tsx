import {MouseEvent, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {AppRoute, StatusLoading} from '../../const';
import {selectCartProducts} from '../../store/dataCart/selectors';
import {selectGuitars, selectGuitarsLoading} from '../../store/dataGuitars/selectors';
import {GuitarType} from '../../types/guitar';
import {formatter, getPreviewImg} from '../../utils/utils';
import CardRate from '../card-rate/card-rate';
import CartAddModal from '../cart-add-modal/cart-add-modal';
import CartSuccessModal from '../cart-success-modal/cart-success-modal';
import Loader from '../loader/loader';

const enum CardButtonName {
  Details = 'Подробнее',
  Buy = 'Купить',
  InCart = 'В Корзине',
}

function CardList(): JSX.Element {
  const guitars = useSelector(selectGuitars);
  const guitarsLoading = useSelector(selectGuitarsLoading);
  const cartProducts = useSelector(selectCartProducts);
  const [guitarAddCart, setGuitarAddCart] = useState<GuitarType>();
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isSuccessModalOpened, setIsSuccessModalOpened] = useState(false);

  const cartProductIds = Object.keys(cartProducts)
    .map((key) => Number(key));

  const handleKeyDown = (key: KeyboardEvent) => {
    if (key.code === 'Escape') {
      setIsModalOpened(false);
      setIsSuccessModalOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  const handleLinkClick = (
    evt: MouseEvent<HTMLAnchorElement>,
    guitar: GuitarType,
  ) => {
    evt.preventDefault();
    setGuitarAddCart(guitar);
    setIsModalOpened(true);
  };

  const handleAddCartModallClose = () => {
    setIsModalOpened(false);
  };

  const handleSuccessModalOpened = () => {
    setIsSuccessModalOpened(true);
  };

  const handleSucccessModalClose = () => {
    setIsSuccessModalOpened(false);
  };


  if ([StatusLoading.Idle, StatusLoading.Loading, StatusLoading.Failed]
    .includes(guitarsLoading)) {
    return (
      <Loader />
    );
  }

  return (
    <>
      <div className="cards catalog__cards" data-testid="catalogCards">
        {guitars.map((guitar) => {
          const {comments, id, previewImg, name, price, rating} = guitar;

          return (
            <div className="product-card" key={id}>
              <img
                src={`/${getPreviewImg(previewImg)}`}
                width="75"
                height="190"
                alt={name}
              />
              <div className="product-card__info">
                <CardRate
                  rating={rating}
                  countRating={comments.length}
                />
                <p className="product-card__title">
                  {name}
                </p>
                <p className="product-card__price">
                  <span className="visually-hidden">
                    Цена:
                  </span>
                  {formatter.format(price)}
                </p>
              </div>
              <div className="product-card__buttons">
                <Link
                  className="button button--mini"
                  to={`${AppRoute.Product}/${id}`}
                >
                  {CardButtonName.Details}
                </Link>
                {!cartProductIds.includes(id)
                  ? (
                    <Link
                      className="button button--red button--mini button--add-to-cart"
                      to="/#"
                      onClick={(evt) => handleLinkClick(evt, guitar)}
                    >
                      {CardButtonName.Buy}
                    </Link>
                  )
                  : (
                    <Link
                      className="button button--red-border button--mini button--in-cart"
                      to={AppRoute.Cart}
                    >
                      {CardButtonName.InCart}
                    </Link>
                  )}
              </div>
            </div>
          );
        })}
      </div>
      {isModalOpened && guitarAddCart !==undefined && (
        <CartAddModal
          guitar={guitarAddCart}
          onSuccessModalOpen={handleSuccessModalOpened}
          onCloseBtn={handleAddCartModallClose}
        />
      )}
      {isSuccessModalOpened && (
        <CartSuccessModal
          onCloseBtn={handleSucccessModalClose}
        />
      )}
    </>
  );
}

export default CardList;
