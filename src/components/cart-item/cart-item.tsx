import {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {ProductDictionary} from '../../const';
import {productIncreaseQuantity, productQuantityChangeCart, productReduceQuantity} from '../../store/dataCart/actions';
import {ProductWithQuantity} from '../../store/dataCart/dataCartReducer';
import {formatter, getPreviewImg} from '../../utils/utils';

const MIN_QUANTITY_PRODUCT = 1;
const MAX_QUANTITY_PRODUCT = 99;

const getValidValue = (value: number): number => {
  if (value <= 0) {
    return MIN_QUANTITY_PRODUCT;
  }
  if (value > MAX_QUANTITY_PRODUCT) {
    return MAX_QUANTITY_PRODUCT;
  }

  return value;
};

type AppScreenProps = {
  product: ProductWithQuantity,
  onProductRemoveBtnClick: (guitar: ProductWithQuantity) => void,
}

function CartItem({product, onProductRemoveBtnClick}: AppScreenProps): JSX.Element {
  const dispatch = useDispatch();

  const [isQuantity, setIsQuantity] = useState('');

  useEffect(() => {
    setIsQuantity(String(getValidValue(product.quantity)));
  }, [product.quantity]);

  const handleReduceQuantityBtnClick = (value: ProductWithQuantity) => {
    if (Number(isQuantity) === MIN_QUANTITY_PRODUCT) {
      onProductRemoveBtnClick(value);
    } else {
      dispatch(productReduceQuantity(value));
    }
  };

  const handleQuantityInputChange = (evt: ChangeEvent<HTMLInputElement>, productQuantityChange: ProductWithQuantity) => {
    const validValue = String(getValidValue((Number(evt.target.value))));
    setIsQuantity(validValue);
    dispatch(productQuantityChangeCart(Number(validValue), productQuantityChange));
  };

  const handleIncreaseQuantityBtnClick = (value: ProductWithQuantity) => {
    if (Number(isQuantity) < MAX_QUANTITY_PRODUCT) {
      dispatch(productIncreaseQuantity(value));
    }
  };

  const handleRemoveProductBtnClick = (value: ProductWithQuantity) => {
    onProductRemoveBtnClick(value);
  };

  const {
    quantity,
    id,
    name,
    vendorCode,
    type,
    previewImg,
    stringCount,
    price,
  } = product;

  return (
    <div key={id} className="cart-item">
      <button
        className="cart-item__close-button button-cross"
        type="button"
        aria-label="Удалить"
        onClick={() => handleRemoveProductBtnClick(product)}
      >
        <span className="button-cross__icon"></span>
        <span className="cart-item__close-button-interactive-area"></span>
      </button>
      <div className="cart-item__image">
        <img
          src={`/${getPreviewImg(previewImg)}`}
          width="55"
          height="130"
          alt={name}
        />
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">
          {name}
        </p>
        <p className="product-info__info">
          Артикул: {vendorCode}
        </p>
        <p className="product-info__info">
          {ProductDictionary[type]}, {stringCount} струнная
        </p>
      </div>
      <div className="cart-item__price">
        {formatter.format(price)}
      </div>
      <div className="quantity cart-item__quantity">
        <button
          className="quantity__button"
          aria-label="Уменьшить количество"
          onClick={() => handleReduceQuantityBtnClick(product)}
        >
          <svg
            width="8"
            height="8"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-minus" />
          </svg>
        </button>
        <input
          className="quantity__input"
          type="number"
          placeholder={String(MIN_QUANTITY_PRODUCT)}
          id="2-count"
          name="2-count"
          max={MAX_QUANTITY_PRODUCT}
          value={isQuantity}
          onChange={(evt) => handleQuantityInputChange(evt, product)}
        />
        <button
          className="quantity__button"
          aria-label="Увеличить количество"
          onClick={() => handleIncreaseQuantityBtnClick(product)}
        >
          <svg
            width="8"
            height="8"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-plus" />
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">
        {formatter.format(price * quantity)}
      </div>
    </div>
  );
}

export default CartItem;
