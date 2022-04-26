import {ChangeEvent, useMemo, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {ParamNames} from '../../const';
import CatalogFilterPrice from '../catalog-filter-price/catalog-filter-price';
import CatalogFilterStringCount from '../catalog-filter-string-count/catalog-filter-string-count';
import CatalogFilterType from '../catalog-filter-type/catalog-filter-type';

type StateChange = {
  stringCounts: number[],
  isChange: boolean,
}

function CatalogFilter(): JSX.Element {
  const location = useLocation();
  const {stringCountParams: stringCountParamsMemo} = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const stringCountParams = params.getAll(ParamNames.StringCount);

    return {stringCountParams};
  }, [location]);

  const [stringCountsChange, setStringCountsChange] = useState<StateChange>({
    stringCounts: [],
    isChange: false,
  });

  const handleStringCountChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {value} = evt.target;
    const {stringCounts} = stringCountsChange;

    if (stringCountParamsMemo.includes(value)) {
      const stringCountsFilter = stringCounts.filter((itemName) => itemName !== Number(value));

      setStringCountsChange({
        ...stringCountsChange,
        stringCounts: stringCountsFilter,
        isChange: true,
      });
    } else {

      setStringCountsChange({
        ...stringCountsChange,
        stringCounts: [...stringCounts, Number(value)],
        isChange: true,
      });
    }
  };

  const handleGuitarTypeChange = (stringCountArray: number[]) => {
    setStringCountsChange({
      ...stringCountsChange,
      stringCounts: stringCountArray,
      isChange: true,
    });
  };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <CatalogFilterPrice />
      <CatalogFilterType onGuitarTypeChange={handleGuitarTypeChange} />
      <CatalogFilterStringCount
        stringCounts={stringCountsChange.stringCounts}
        isChange={stringCountsChange.isChange}
        onStringCountChange={handleStringCountChange}
      />
    </form>
  );
}

export default CatalogFilter;
