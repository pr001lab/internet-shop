import {useEffect, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {useLocation} from 'react-router-dom';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CardList from '../../components/card-list/card-list';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Pagination from '../../components/pagination/pagination';
import {BreadcrumbsName, LIMIT_PAGE, ParamNames} from '../../const';
import {fetchGuitarsAction} from '../../store/dataGuitars/api-actions';
import {BreadcrumbType} from '../../types/breadcrumb';


function Main(): JSX.Element {
  const dispatch = useDispatch();

  const location = useLocation();
  const {priceGteParams: priceGteParamsMemo, priceLteParams: priceLteParamsMemo, sortTypeParams: sortTypeParamsMemo, sortOrderParams: sortOrderParamsMemo, typeParams: typeParamsMemo, stringCountParams: stringCountParamsMemo, numberPageUrl: numberPageUrlMemo} = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const priceGteParams = params.get(ParamNames.PriceGte);
    const priceLteParams = params.get(ParamNames.PriceLte);
    const sortTypeParams = params.get(ParamNames.SortingType);
    const sortOrderParams = params.get(ParamNames.SortingOrder);
    const typeParams = params.getAll(ParamNames.Type);
    const stringCountParams = params.getAll(ParamNames.StringCount);

    const numberPageUrl = (location.pathname).replace(/[/catalog/page_]/ig, '');

    return {priceGteParams, priceLteParams, sortTypeParams, sortOrderParams, typeParams, stringCountParams, numberPageUrl};
  }, [location]);

  useEffect(() => {
    const queryParams = new URLSearchParams();
    stringCountParamsMemo.forEach((stringCount) => {
      queryParams.append(ParamNames.StringCount, String(stringCount));
    });
    typeParamsMemo.forEach((guitarType) => {
      queryParams.append(ParamNames.Type, guitarType);
    });
    if (priceGteParamsMemo !== null) {
      queryParams.append(ParamNames.PriceGte, priceGteParamsMemo);
    }
    if (priceLteParamsMemo !== null) {
      queryParams.append(ParamNames.PriceLte, priceLteParamsMemo);
    }
    if (sortTypeParamsMemo !== null && sortOrderParamsMemo !== null) {
      queryParams.append(ParamNames.SortingType, sortTypeParamsMemo);
      queryParams.append(ParamNames.SortingOrder, sortOrderParamsMemo);
    }

    const startNumberPosition = (Number(numberPageUrlMemo) - 1) * LIMIT_PAGE;
    queryParams.append(ParamNames.StartNumberPosition, String(startNumberPosition));
    queryParams.append(ParamNames.LimitPosition, String(LIMIT_PAGE));

    dispatch(fetchGuitarsAction(queryParams));
  }, [dispatch, numberPageUrlMemo, priceGteParamsMemo, priceLteParamsMemo,
    sortOrderParamsMemo, sortTypeParamsMemo, stringCountParamsMemo, typeParamsMemo]);

  const Breadcrumb: BreadcrumbType = {
    [BreadcrumbsName.Main]: {
      link: undefined,
    },
    [BreadcrumbsName.Catalog]: {
      link: undefined,
    },
  } as const;

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">
            Каталог гитар
          </h1>
          <Breadcrumbs breadcrumb={Breadcrumb} />
          <div className="catalog">
            <CatalogFilter />
            <CatalogSort />
            <CardList />
            <Pagination />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Main;
