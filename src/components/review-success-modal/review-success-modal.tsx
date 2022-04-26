import {useEffect, useRef} from 'react';
import {KeyboardName} from '../../const';

export const enum ReviewSuccessButtonName {
  ToBuy = 'К покупкам!',
}

type ComponentProps = {
  onCloseBtn: () => void;
}

function ReviewSuccessModal({onCloseBtn}: ComponentProps): JSX.Element {
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

  return (
    <div style={{position: 'relative', width: 550, height: 410, marginBottom: 50}}>
      <div className="modal is-active modal--success modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal></div>
          <div
            className="modal__content"
            ref={refDivModalContent}
          >
            <svg
              className="modal__icon"
              width="26"
              height="20"
              aria-hidden="true"
            >
              <use xlinkHref="#icon-success" />
            </svg>
            <p className="modal__message">
              Спасибо за ваш отзыв!
            </p>
            <div className="modal__button-container modal__button-container--review">
              <button
                className="button button--small modal__button modal__button--review"
                onClick={onCloseBtn}
                ref={refFirstElement}
                onKeyDown={(evt: any) => handleFirstElementTabKeyDown(evt)}
              >
                {ReviewSuccessButtonName.ToBuy}
              </button>
            </div>
            <button
              className="modal__close-btn button-cross"
              type="button"
              aria-label="Закрыть"
              onClick={onCloseBtn}
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

export default ReviewSuccessModal;
