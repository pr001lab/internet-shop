import {useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {KeyboardName, ProductDictionary} from '../../const';
import {productIncreaseQuantity} from '../../store/dataCart/actions';
import {GuitarType} from '../../types/guitar';
import {formatter, getPreviewImg} from '../../utils/utils';

export const enum CartButtonName {
  CartAdd = 'Добавить в корзину',
}

type ComponentProps = {
  guitar: GuitarType;
  onSuccessModalOpen: () => void;
  onCloseBtn: () => void;
}

function CartAddModal({
  guitar,
  onSuccessModalOpen,
  onCloseBtn}: ComponentProps): JSX.Element {
  const dispatch = useDispatch();
  const refDivModalContent = useRef<HTMLDivElement>(null);
  const refFirstElement = useRef<HTMLButtonElement>(null);
  const refLastElement = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    refFirstElement.current?.focus();
  }, []);

  const handleFirstElementTabKeyDown = (evt: KeyboardEvent) => {
    if (evt.shiftKey && evt.code === KeyboardName.Tab) {
      refLastElement.current?.focus();
      evt.preventDefault();
    }
  };

  const handleLastElementTabKeyDown = (evt: KeyboardEvent) => {
    if (!evt.shiftKey && evt.code === KeyboardName.Tab) {
      refFirstElement.current?.focus();
      evt.preventDefault();
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  });

  useEffect(() => {
    function handleClickOutside(evt: any) {
      if (refDivModalContent.current && !refDivModalContent.current.contains(evt.target)) {
        onCloseBtn();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onCloseBtn]);


  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === KeyboardName.Escape) {
        onCloseBtn();
      }
    }

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [onCloseBtn]);

  const handleAddCart = (guitarAddCart: GuitarType) => {
    dispatch(productIncreaseQuantity(guitarAddCart));
    onSuccessModalOpen();
    onCloseBtn();
  };

  const {previewImg, name, price, stringCount, type, vendorCode} = guitar;

  return (
    <div
      style={{position: 'relative', width: 550, height: 440, marginBottom: 50}}
    >
      <div className="modal is-active modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal></div>
          <div
            ref={refDivModalContent}
            className="modal__content"
          >
            <h2 className="modal__header title title--medium">
              Добавить товар в корзину
            </h2>
            <div className="modal__info">
              <img
                className="modal__img"
                src={`/${getPreviewImg(previewImg)}`}
                width="67"
                height="137"
                alt={name}
              />
              <div className="modal__info-wrapper">
                <h3 className="modal__product-name title title--little title--uppercase">
                  Гитара {name}
                </h3>
                <p className="modal__product-params modal__product-params--margin-11">
                  Артикул: {vendorCode}
                </p>
                <p className="modal__product-params">
                  {ProductDictionary[type]}, {stringCount} струнная
                </p>
                <p className="modal__price-wrapper">
                  <span className="modal__price">
                    Цена:
                  </span>
                  <span className="modal__price">
                    {formatter.format(price)}
                  </span>
                </p>
              </div>
            </div>
            <div className="modal__button-container">
              <button
                ref={refFirstElement}
                className="button button--red button--big modal__button modal__button--add"
                onKeyDown={(evt: any) => handleFirstElementTabKeyDown(evt)}
                onClick={() => handleAddCart(guitar)}
              >
                {CartButtonName.CartAdd}
              </button>
            </div>
            <button
              ref={refLastElement}
              className="modal__close-btn button-cross"
              type="button"
              aria-label="Закрыть"
              onClick={onCloseBtn}
              onKeyDown={(evt: any) => handleLastElementTabKeyDown(evt)}
            >
              <span className="button-cross__icon"></span>
              <span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartAddModal;
