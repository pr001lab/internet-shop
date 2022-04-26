import cn from 'classnames';
import {ChangeEvent, useEffect, useMemo, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {useHistory, useLocation} from 'react-router-dom';
import {AppRoute, FieldNames, PAGINATION_FIRST_PAGE, ParamNames} from '../../const';
import {selectGuitarsPriceMax, selectGuitarsPriceMin} from '../../store/dataGuitars/selectors';
import styles from './catalog-filter-price.module.css';

type InputPriceStateType = {
  value: string,
  error: boolean,
  errorText: string,
  onBlur: boolean,
  touched: boolean
};

function CatalogFilterPrice(): JSX.Element {
  const history = useHistory();
  const guitarsPriceMin = useSelector(selectGuitarsPriceMin);
  const guitarsPriceMax = useSelector(selectGuitarsPriceMax);
  const priceMinRef = useRef<HTMLInputElement>(null);
  const priceMaxRef = useRef<HTMLInputElement>(null);

  const location = useLocation();
  const {
    priceGteParams: priceGteParamsMemo,
    priceLteParams: priceLteParamsMemo,
    numberPageUrl: numberPageUrlMemo,
  } = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const priceGteParams = params.get(ParamNames.PriceGte);
    const priceLteParams = params.get(ParamNames.PriceLte);

    const numberPageUrl = (location.pathname).replace(/[/catalog/page_]/ig, '');

    return {priceGteParams, priceLteParams, numberPageUrl};
  }, [location]);

  const [price, setPrice] = useState<{[key: string]: InputPriceStateType}>({
    priceMin: {
      value: '',
      error: false,
      errorText: 'Значение не д.б. < 0',
      onBlur: false,
      touched: false,
    },
    priceMax: {
      value: '',
      error: false,
      errorText: 'Значение не д.б. < 0',
      onBlur: false,
      touched: false,
    },
  });

  useEffect(() => {
    if (priceGteParamsMemo !== null && price.priceMin.value === ''
      && price.priceMin.touched === false) {
      setPrice({
        ...price,
        priceMin: {
          ...price.priceMin,
          value: priceGteParamsMemo,
        },
      });
    }
    if (priceLteParamsMemo !== null && price.priceMax.value === ''
      && price.priceMax.touched === false) {
      setPrice({
        ...price,
        priceMax: {
          ...price.priceMax,
          value: priceLteParamsMemo,
        },
      });
    }
  }, [price, priceGteParamsMemo, priceLteParamsMemo]);

  useEffect(() => {
    if ((price.priceMin.onBlur || price.priceMax.onBlur) &&
      !price.priceMax.error && !price.priceMin.error && !price.priceMin.touched
      && !price.priceMax.touched) {
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.delete(ParamNames.PriceGte);
      queryParams.delete(ParamNames.PriceLte);
      if (price.priceMin.value !== '') {
        queryParams.append(ParamNames.PriceGte, String(price.priceMin.value));
      }
      if (price.priceMax.value !== '') {
        queryParams.append(ParamNames.PriceLte, String(price.priceMax.value));
      }

      history.push(`${AppRoute.Catalog}${PAGINATION_FIRST_PAGE}?${queryParams}`);

      setPrice({
        ...price,
        priceMin: {
          ...price.priceMin,
          onBlur: false,
        },
        priceMax: {
          ...price.priceMax,
          onBlur: false,
        },
      });
    }
  }, [history, numberPageUrlMemo, price]);

  useEffect(() => {
    if (priceMinRef.current !== null && price.priceMin.error && !price.priceMin.touched) {
      priceMinRef.current.focus();
    }
    if (priceMaxRef.current !== null && price.priceMax.error && !price.priceMax.touched) {
      priceMaxRef.current.focus();
    }
  }, [price]);

  const handlePriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {id, value} = evt.target;
    const isValid = Number(value) > 0 || value === '';

    setPrice({
      ...price,
      [id]: {
        ...price[id],
        value: value,
        error: !isValid,
        onBlur: false,
        touched: true,
      },
    });
  };

  const handlePriceBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    const {id, value, placeholder} = evt.target;
    let priceValue = value;
    if (value !== '' && price[id].error === false) {
      priceValue = id === FieldNames.PriceMin
        ? String(Math.max(Number(value), Number(placeholder)))
        : String(Math.min(Number(value), Number(placeholder)));
    }

    setPrice({
      ...price,
      [id]: {
        ...price[id],
        value: priceValue,
        onBlur: !price[id].error,
        touched: false,
      },
    });
  };

  const inputPriceMinCls = cn({[styles.error]: price.priceMin.error});
  const inputpriceMaxCls = cn({[styles.error]: price.priceMax.error});

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <p className={styles.errorText}>
          {((price.priceMin.error && price.priceMin.touched) ||
            (price.priceMax.error && price.priceMax.touched))
          && price.priceMax.errorText}
        </p>
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input
            ref={priceMinRef}
            className={inputPriceMinCls}
            placeholder={String(guitarsPriceMin)}
            id={FieldNames.PriceMin}
            name="от"
            value={String(price.priceMin.value)}
            onChange={handlePriceChange}
            onBlur={handlePriceBlur}
            data-testid={FieldNames.PriceMin}
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input
            ref={priceMaxRef}
            className={inputpriceMaxCls}
            placeholder={String(guitarsPriceMax)}
            id={FieldNames.PriceMax}
            name="до"
            value={String(price.priceMax.value)}
            onChange={handlePriceChange}
            onBlur={handlePriceBlur}
            data-testid={FieldNames.PriceMax}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default CatalogFilterPrice;
