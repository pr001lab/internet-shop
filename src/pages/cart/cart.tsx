import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CartList from '../../components/cart-list/cart-list';
import CartRemoveModal from '../../components/cart-remove-modal/cart-remove-modal';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import {AppRoute, BreadcrumbsName, PAGINATION_FIRST_PAGE} from '../../const';
import {productRemove} from '../../store/dataCart/actions';
import {ProductWithQuantity} from '../../store/dataCart/dataCartReducer';
import {selectCartProducts} from '../../store/dataCart/selectors';
import {postCouponFailure} from '../../store/dataCouponPost/actions';
import {BreadcrumbType} from '../../types/breadcrumb';

const EMPTY_CART_MESSAGE = 'В корзине товаров нет. Добавьте их на странице Каталог';

function Cart(): JSX.Element {
  const dispatch = useDispatch();
  const cartProducts = useSelector(selectCartProducts);

  const [guitarAddCart, setGuitarAddCart] = useState<ProductWithQuantity>();
  const [isModalOpened, setIsModalOpened] = useState(false);

  useEffect(() => {
    document.title = 'Корзина — Guitar-shop';
  }, []);

  useEffect(() => () => {
    dispatch(postCouponFailure(null));
  }, [dispatch]);

  const Breadcrumb: BreadcrumbType = {
    Main: {
      link: AppRoute.Main,
    },
    Catalog: {
      link: `${AppRoute.Catalog}${PAGINATION_FIRST_PAGE}`,
    },
    Cart: {
      link: AppRoute.Cart,
    },
  } as const;

  const handleProductRemoveBtnClick = (guitar: ProductWithQuantity) => {
    setGuitarAddCart(guitar);
    setIsModalOpened(true);
  };

  const handleRemoveModalClose = () => {
    setIsModalOpened(false);
  };

  const handleRemoveBtnClick = (guitar: ProductWithQuantity) => {
    dispatch(productRemove(guitar));
    setIsModalOpened(false);
  };

  return (
    <>
      <div className="wrapper">
        <Header/>
        <main className="page-content">
          <div className="container">
            <h1 className="title title--bigger page-content__title">
              {BreadcrumbsName.Cart}
            </h1>
            <Breadcrumbs breadcrumb={Breadcrumb} />
            {Object.keys(cartProducts).length > 0 && (
              <CartList
                cartProducts={cartProducts}
                onProductRemoveBtnClick={handleProductRemoveBtnClick}
              />
            )}
            {Object.keys(cartProducts).length <= 0 && (
              EMPTY_CART_MESSAGE
            )}
          </div>
        </main>
        <Footer/>
      </div>
      {isModalOpened && guitarAddCart !==undefined && (
        <CartRemoveModal
          guitar={guitarAddCart}
          onRemoveBtn={handleRemoveBtnClick}
          onCloseBtn={handleRemoveModalClose}
        />
      )}
    </>
  );
}

export default Cart;
