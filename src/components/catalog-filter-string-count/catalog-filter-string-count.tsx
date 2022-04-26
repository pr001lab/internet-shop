import {ChangeEvent, useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {useHistory, useLocation} from 'react-router-dom';
import {AppRoute, PAGINATION_FIRST_PAGE, ParamNames} from '../../const';
import {
  selectGuitarTypeListWithStrings,
  selectStringCountList
} from '../../store/dataGuitars/selectors';
import {getAllUniqStringCounts} from '../../utils/utils';

type AppScreenProps = {
  stringCounts: number[],
  isChange: boolean,
  onStringCountChange: (evt: ChangeEvent<HTMLInputElement>) => void
}

function CatalogFilterStringCount({
  stringCounts,
  isChange,
  onStringCountChange,
}: AppScreenProps): JSX.Element {
  const history = useHistory();
  const guitarTypeListWithStrings = useSelector(selectGuitarTypeListWithStrings);
  const stringCountList = useSelector(selectStringCountList);

  const location = useLocation();
  const {
    typeParams: typeParamsMemo,
    stringCountParams: stringCountParamsMemo,
  } = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const typeParams = params.getAll(ParamNames.Type);
    const stringCountParams = params.getAll(ParamNames.StringCount);

    return {typeParams, stringCountParams};
  }, [location]);

  useEffect(() => {
    if(isChange) {
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.delete(ParamNames.StringCount);
      stringCounts.forEach((stringCount) => {
        queryParams.append(ParamNames.StringCount, String(stringCount));
      });

      history.push(`${AppRoute.Catalog}${PAGINATION_FIRST_PAGE}?${queryParams}`);
    }
  }, [history, isChange, stringCounts]);


  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Количество струн</legend>
      {stringCountList?.map((stringCountItem) => {

        const isDisabled = typeParamsMemo.length > 0
          && !getAllUniqStringCounts(guitarTypeListWithStrings, typeParamsMemo)
            .includes(stringCountItem);
        const isChecked = stringCountParamsMemo.includes(String(stringCountItem));

        return (
          <div
            key={stringCountItem}
            className="form-checkbox catalog-filter__block-item"
          >
            <input
              className="visually-hidden" type="checkbox"
              id={`${stringCountItem}-strings`}
              name={`${stringCountItem}-strings`}
              disabled={isDisabled}
              value={stringCountItem}
              checked={isChecked}
              onChange={onStringCountChange}
            />
            <label htmlFor={`${stringCountItem}-strings`}>{stringCountItem}</label>
          </div>
        );
      })}
    </fieldset>
  );
}

export default CatalogFilterStringCount;
