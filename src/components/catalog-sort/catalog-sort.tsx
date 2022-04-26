import cn from 'classnames';
import {MouseEvent, useEffect, useMemo, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {AppRoute, PAGINATION_FIRST_PAGE, ParamNames, SortButtonName, SortOrderType, SortType} from '../../const';
import styles from './catalog-sort.module.css';

function CatalogSort(): JSX.Element {
  const history = useHistory();

  const location = useLocation();
  const {sortTypeParams: sortTypeParamsMemo,
    sortOrderParams: sortOrderParamsMemo,
  } = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const sortTypeParams = params.get(ParamNames.SortingType);
    const sortOrderParams = params.get(ParamNames.SortingOrder);

    return {sortTypeParams, sortOrderParams};
  }, [location]);

  const [sort, setSort] = useState({
    sortingType: '',
    sortingOrder: '',
  });

  useEffect(() => {
    if (sort.sortingType !== '' && sort.sortingOrder !== '') {
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.delete(ParamNames.SortingType);
      queryParams.append(ParamNames.SortingType, sort.sortingType);
      queryParams.delete(ParamNames.SortingOrder);
      queryParams.append(ParamNames.SortingOrder, sort.sortingOrder);

      history.push(`${AppRoute.Catalog}${PAGINATION_FIRST_PAGE}?${queryParams}`);
    }
  }, [history, sort.sortingOrder, sort.sortingType]);

  const handleSortButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    if (evt.currentTarget.ariaLabel === SortButtonName.Price) {
      setSort({
        ...sort,
        sortingType: SortType.Price,
      });
    }
    if (evt.currentTarget.ariaLabel === SortButtonName.Rating) {
      setSort({
        ...sort,
        sortingType: SortType.Rating,
      });
    }
    if (evt.currentTarget.ariaLabel === SortButtonName.Asc) {
      setSort((prevSort) => ({
        ...prevSort,
        sortingOrder: SortOrderType.Asc,
      }));
      if (sortTypeParamsMemo === null) {
        setSort((prevSort) => ({
          ...prevSort,
          sortingType: SortType.Price,
        }));
      }
    }
    if (evt.currentTarget.ariaLabel === SortButtonName.Desc) {
      setSort((prevSort) => ({
        ...prevSort,
        sortingOrder: SortOrderType.Desc,
      }));
      if (sortTypeParamsMemo === null) {
        setSort((prevSort) => ({
          ...prevSort,
          sortingType: SortType.Price,
        }));
      }
    }
  };

  const getClassSortTypeButtonActive = (sortVariant: SortType) => cn(
    'catalog-sort__type-button',
    {'catalog-sort__type-button--active': sortTypeParamsMemo === sortVariant},
  );

  const getClassSortOrderButtonUpActive = (sortVariant: SortOrderType) => cn(
    'catalog-sort__order-button',
    {[styles.orderButtonUp]: SortOrderType.Asc === sortVariant},
    {'catalog-sort__order-button--down': SortOrderType.Desc === sortVariant},
    {'catalog-sort__order-button--active': sortOrderParamsMemo === sortVariant},
  );

  const getClassSortOrderButtonDownActive = (sortVariant: SortOrderType) => cn(
    'catalog-sort__order-button',
    {'catalog-sort__order-button--down': SortOrderType.Desc === sortVariant},
    {'catalog-sort__order-button--active': sortOrderParamsMemo === sortVariant},
  );

  const getSortTypeTabIndex = (sortVariant: SortType): number => sortVariant === sortTypeParamsMemo ? -1 : 0;

  const getSortOrderTabIndex = (sortVariant: SortOrderType): number => sortVariant === sortOrderParamsMemo ? -1 : 0;

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={getClassSortTypeButtonActive(SortType.Price)}
          aria-label={SortButtonName.Price}
          tabIndex={getSortTypeTabIndex(SortType.Price)}
          onClick={handleSortButtonClick}
        >
          {SortButtonName.Price}
        </button>
        <button
          className={getClassSortTypeButtonActive(SortType.Rating)}
          aria-label={SortButtonName.Rating}
          tabIndex={getSortTypeTabIndex(SortType.Rating)}
          onClick={handleSortButtonClick}
        >
          {SortButtonName.Rating}
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={getClassSortOrderButtonUpActive(SortOrderType.Asc)}
          aria-label={SortButtonName.Asc}
          tabIndex={getSortOrderTabIndex(SortOrderType.Asc)}
          onClick={handleSortButtonClick}
        >
        </button>
        <button
          className={getClassSortOrderButtonDownActive(SortOrderType.Desc)}
          aria-label={SortButtonName.Desc}
          tabIndex={getSortOrderTabIndex(SortOrderType.Desc)}
          onClick={handleSortButtonClick}
        >
        </button>
      </div>
    </div>
  );
}

export default CatalogSort;
