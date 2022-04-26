import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {AppRoute, BreadcrumbsName} from '../../const';
import {selectCartProducts} from '../../store/dataCart/selectors';

const enum HeaderNavigationUserLink {
  Cart = 'Перейти в корзину',
}

function HeaderNavigationUser(): JSX.Element {
  const cartProducts = useSelector(selectCartProducts);
  const lengthCartProducts = Object.values(cartProducts)
    .reduce((acc, value) => acc += value.quantity, 0);

  return (
    <Link
      className="header__cart-link"
      to={AppRoute.Cart}
      aria-label={BreadcrumbsName.Cart}
    >
      <svg
        className="header__cart-icon"
        width="14"
        height="14"
        aria-hidden="true"
      >
        <use xlinkHref="#icon-basket" />
      </svg>
      <span className="visually-hidden">
        {HeaderNavigationUserLink.Cart}
      </span>
      {lengthCartProducts > 0 && (
        <span className="header__cart-count">
          {lengthCartProducts}
        </span>
      )}
    </Link>
  );
}

export default HeaderNavigationUser;
