import {Link} from 'react-router-dom';
import {BreadcrumbsName} from '../../const';
import {BreadcrumbType} from '../../types/breadcrumb';

type ComponentProps = {
  breadcrumb: BreadcrumbType;
}

function Breadcrumbs({breadcrumb}: ComponentProps): JSX.Element {
  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      {Object.entries(breadcrumb).map(([key, value]) => (
        <li key={key} className="breadcrumbs__item">
          <Link
            className="link"
            to={value.link === undefined
              ? '/#'
              : value.link}
          >
            {BreadcrumbsName[key] === undefined
              ? key
              : BreadcrumbsName[key]}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Breadcrumbs;
