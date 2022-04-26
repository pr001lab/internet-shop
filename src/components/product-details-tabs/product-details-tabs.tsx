import cn from 'classnames';
import {MouseEvent, useState} from 'react';
import {Link} from 'react-router-dom';
import {ProductDictionary} from '../../const';
import {GuitarType} from '../../types/guitar';

const enum TabNameState {
  Description = 'description',
  Characteristics = 'characteristics',
}

export const enum TabTitle {
  Description = 'Описание',
  Characteristics = 'Характеристики',
}

type ComponentProps = {
  guitar:  GuitarType;
}

function ProductDetailsTabs({guitar}: ComponentProps): JSX.Element {
  const [tab, setTab] = useState<string>(TabNameState.Characteristics);
  const {vendorCode, type, stringCount, description} = guitar;

  const handleTabChange = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();

    if (evt.currentTarget.innerText === TabTitle.Description) {
      setTab(TabNameState.Description);
    } else {
      setTab(TabNameState.Characteristics);
    }
  };

  const clsNameCharacteristics = cn('tabs__table', {
    'hidden': tab === TabNameState.Description,
  });

  const clsNameDescription = cn('tabs__product-description', {
    'hidden': tab === TabNameState.Characteristics,
  });

  const clsActiveLink = 'button button--medium tabs__button';
  const clsInActiveLink = 'button button--black-border button--medium tabs__button';

  return (
    <div className="tabs">
      <Link
        className={tab === TabNameState.Characteristics
          ? clsActiveLink
          : clsInActiveLink}
        to="#characteristics"
        onClick={handleTabChange}
      >
        Характеристики
      </Link>
      <Link
        className={tab === TabNameState.Description
          ? clsActiveLink
          : clsInActiveLink}
        to="#description"
        onClick={handleTabChange}
      >
        Описание
      </Link>
      <div className="tabs__content" id="characteristics">
        <table className={clsNameCharacteristics}>
          <tbody>
            <tr className="tabs__table-row">
              <td className="tabs__title">
                Артикул:
              </td>
              <td className="tabs__value">
                {vendorCode}
              </td>
            </tr>
            <tr className="tabs__table-row">
              <td className="tabs__title">
                Тип:
              </td>
              <td className="tabs__value">
                {ProductDictionary[type]}
              </td>
            </tr>
            <tr className="tabs__table-row">
              <td className="tabs__title">
                Количество струн:
              </td>
              <td className="tabs__value">
                {stringCount} струнная
              </td>
            </tr>
          </tbody>
        </table>
        <p className={clsNameDescription} id="description">
          {description}
        </p>
      </div>
    </div>
  );
}

export default ProductDetailsTabs;
