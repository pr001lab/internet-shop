import {useEffect, useRef} from 'react';
import {KeyboardName, ProductDictionary} from '../../const';
import {ProductWithQuantity} from '../../store/dataCart/dataCartReducer';
import {formatter, getPreviewImg} from '../../utils/utils';

const enum CartButtonName {
  RemoveProduct = 'Удалить товар',
  NextBuy = 'Продолжить покупки',
}

type ComponentProps = {
  guitar: ProductWithQuantity,
  onRemoveBtn: (guitar: ProductWithQuantity) => void;
  onCloseBtn: () => void;
}

function CartRemoveModal({guitar, onRemoveBtn, onCloseBtn}: ComponentProps): JSX.Element {
  const {type, stringCount, previewImg, name, price, vendorCode} = guitar;
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

  const handleRemoveBtnClick = (guitarRemove: ProductWithQuantity) => {
    onRemoveBtn(guitarRemove);
  };

  const handleNextBuyBtnClick = () => {
    onCloseBtn();
  };

  return (
    <div style={{position: 'relative', width: 550, height: 440, marginBottom: 50}}>
      <div className="modal is-active modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal></div>
          <div
            className="modal__content"
            ref={refDivModalContent}
          >
            <h2 className="modal__header title title--medium title--red">
              Удалить этот товар?
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
                  {name}
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
                className="button button--small modal__button"
                onClick={() => handleRemoveBtnClick(guitar)}
                ref={refFirstElement}
                onKeyDown={(evt: any) => handleFirstElementTabKeyDown(evt)}
              >
                {CartButtonName.RemoveProduct}
              </button>
              <button
                className="button button--black-border button--small modal__button modal__button--right"
                onClick={handleNextBuyBtnClick}
              >
                {CartButtonName.NextBuy}
              </button>
            </div>
            <button
              className="modal__close-btn button-cross"
              type="button"
              aria-label="Закрыть"
              onClick={handleNextBuyBtnClick}
              ref={refLastElement}
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

export default CartRemoveModal;
