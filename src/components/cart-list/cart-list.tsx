import cn from 'classnames';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {CouponPostField, StatusLoading} from '../../const';
import {ProductWithQuantity} from '../../store/dataCart/dataCartReducer';
import {postCouponFailure} from '../../store/dataCouponPost/actions';
import {postCouponAction} from '../../store/dataCouponPost/api-actions';
import {
  selectCoupon,
  selectPostCouponLoading,
  selectPostCouponLoadingError
} from '../../store/dataCouponPost/selectors';
import {CouponPostType} from '../../types/coupon';
import {formatter} from '../../utils/utils';
import CartItem from '../cart-item/cart-item';

const enum CartButtonName {
  Use = 'Применить',
  PlaceOrder = 'Оформить заказ',
}

const ValidationMessage = {
  ErrorValidation: 'Д.б. 1 слово без пробелов',
  RegExp: /^\S*$/,
} as const;

const enum CouponPostMessage {
  ErrorValidation = 'Д.б. 1 слово без пробелов',
  InvalidCoupon = 'неверный промокод',
  ValidCoupon = 'Промокод принят',
}

type Props = {
  cartProducts: {[key: number]: ProductWithQuantity},
  onProductRemoveBtnClick: (guitar: ProductWithQuantity) => void;
}

function CartList({cartProducts, onProductRemoveBtnClick}: Props): JSX.Element {
  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
  } = useForm<CouponPostType>({
    mode: 'onSubmit',
  });
  const dispatch = useDispatch();
  const couponVolume = useSelector(selectCoupon);
  const postCouponLoading = useSelector(selectPostCouponLoading);
  const postCouponLoadingError = useSelector(selectPostCouponLoadingError);

  const handleCouponFormSubmit = (dataForm: CouponPostType) => {
    dispatch(postCouponFailure(null));
    dispatch(postCouponAction(dataForm));
  };

  const totalPrice = Object.values(cartProducts)
    .reduce((acc, value) => acc += value.price * value.quantity, 0);

  const totalCoupon = (couponVolume !== null && couponVolume > 0)
    ? - totalPrice * couponVolume / 100
    : 0;

  const clsTotalCoupon = cn('cart__total-value', {
    'cart__total-value--bonus': - totalCoupon > 0,
  });

  return (
    <div className="cart">
      {Object.values(cartProducts).map((value) => (
        <CartItem
          key={value.id}
          product={value}
          onProductRemoveBtnClick={onProductRemoveBtnClick}
        />
      ))}

      <div className="cart__footer">
        <div className="cart__coupon coupon">
          <h2 className="title title--little coupon__title">
            Промокод на скидку
          </h2>
          <p className="coupon__info">
            Введите свой промокод, если он у вас есть.
          </p>
          <form
            className="coupon__form"
            id="coupon-form"
            method="post"
            action="/"
            onSubmit={handleSubmit(handleCouponFormSubmit)}
          >
            <div className="form-input coupon__input">
              <label className="visually-hidden">
                Промокод
              </label>
              <input
                type="text"
                placeholder="Введите промокод"
                id="coupon"
                {...register(CouponPostField.Coupon, {
                  required: ValidationMessage.ErrorValidation,
                  pattern: {
                    value: ValidationMessage.RegExp,
                    message: ValidationMessage.ErrorValidation,
                  },
                })}
              />
              {errors.coupon && (
                <p className="form-input__message form-input__message--error">
                  {errors.coupon.message}
                </p>
              )}
              {postCouponLoadingError === '400' && (
                <p className="form-input__message form-input__message--error">
                  {CouponPostMessage.InvalidCoupon}
                </p>
              )}
              {postCouponLoading === StatusLoading.Succeeded && (
                <p className="form-input__message form-input__message--success">
                  {CouponPostMessage.ValidCoupon}
                </p>
              )}
            </div>
            <button
              className="button button--big coupon__button"
            >
              {CartButtonName.Use}
            </button>
          </form>
        </div>
        <div className="cart__total-info">
          <p className="cart__total-item">
            <span className="cart__total-value-name">
              Всего:
            </span>
            <span className="cart__total-value">
              {formatter.format(totalPrice)}
            </span>
          </p>
          <p className="cart__total-item">
            <span className="cart__total-value-name">
              Скидка:
            </span>
            <span className={clsTotalCoupon}>
              {formatter.format(totalCoupon)}
            </span>
          </p>
          <p className="cart__total-item">
            <span className="cart__total-value-name">
              К оплате:
            </span>
            <span className="cart__total-value cart__total-value--payment">
              {formatter.format(totalPrice + totalCoupon)}
            </span>
          </p>
          <button
            className="button button--red button--big cart__order-button"
          >
            {CartButtonName.PlaceOrder}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartList;
