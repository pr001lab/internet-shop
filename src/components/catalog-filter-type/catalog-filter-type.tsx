import {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {useHistory, useLocation} from 'react-router-dom';
import {AppRoute, FilterDictionary, PAGINATION_FIRST_PAGE, ParamNames} from '../../const';
import {selectGuitarTypeListWithStrings} from '../../store/dataGuitars/selectors';
import {getAllUniqStringCounts} from '../../utils/utils';

type AppScreenProps = {
  onGuitarTypeChange: (stringCountArray: number[]) => void;
}

type StateChange = {
  guitarTypes: string[],
  isChange: boolean,
}

function CatalogFilterType({onGuitarTypeChange}: AppScreenProps): JSX.Element {
  const history = useHistory();
  const guitarTypeListWithStrings = useSelector(selectGuitarTypeListWithStrings);

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

  const [guitarTypesChange, setGuitarTypesChange] = useState<StateChange>({
    guitarTypes: [],
    isChange: false,
  });

  useEffect(() => {
    if (guitarTypesChange.isChange) {
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.delete(ParamNames.Type);
      const {guitarTypes} = guitarTypesChange;
      guitarTypes.forEach((guitarType) => {
        queryParams.append(ParamNames.Type, guitarType);
      });
      history.push(`${AppRoute.Catalog}${PAGINATION_FIRST_PAGE}?${queryParams}`);
    }
  }, [guitarTypesChange, history]);

  const handleGuitarTypeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {name} = evt.target;
    const {guitarTypes} = guitarTypesChange;

    if (typeParamsMemo.includes(name)) {
      const currentGuitarTypes = guitarTypes.filter((itemName) => itemName !== name);
      setGuitarTypesChange({
        ...guitarTypesChange,
        guitarTypes: currentGuitarTypes,
        isChange: true,
      });
      if (stringCountParamsMemo.length > 0) {
        const stringCountsInUrl = getAllUniqStringCounts(
          guitarTypeListWithStrings,
          currentGuitarTypes,
        )
          .filter((stringCount) => stringCountParamsMemo.includes(String(stringCount)));
        onGuitarTypeChange(stringCountsInUrl);
      }

    } else {
      setGuitarTypesChange({
        ...guitarTypesChange,
        guitarTypes: [...guitarTypes, name],
        isChange: true,
      });
      if (stringCountParamsMemo.length > 0) {
        const stringCountsInUrl = getAllUniqStringCounts(
          guitarTypeListWithStrings,
          [...guitarTypes, name],
        )
          .filter((stringCount) => stringCountParamsMemo.includes(String(stringCount)));
        onGuitarTypeChange(stringCountsInUrl);
      }
    }
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Тип гитар</legend>
      {guitarTypeListWithStrings && Object.keys(guitarTypeListWithStrings)
        .sort()
        .map((guitarTypeItem) => (
          <div key={guitarTypeItem} className="form-checkbox catalog-filter__block-item">
            <input
              className="visually-hidden" type="checkbox"
              id={guitarTypeItem}
              name={guitarTypeItem}
              checked={typeParamsMemo.includes(guitarTypeItem)}
              onChange={handleGuitarTypeChange}
            />
            <label htmlFor={guitarTypeItem}>{FilterDictionary[guitarTypeItem]}</label>
          </div>
        ))}
    </fieldset>
  );
}

export default CatalogFilterType;
