import cn from 'classnames';
import {Link, useLocation} from 'react-router-dom';
import {AppRoute, PAGINATION_FIRST_PAGE} from '../../const';

export const HeaderNavigationLink = {
  Catalog: {
    title: 'Каталог',
    link: `${AppRoute.Catalog}${PAGINATION_FIRST_PAGE}`,
    linkCurrent: AppRoute.Catalog,
  },
  WhereToBuy: {
    title: 'Где купить?',
    link: '/#',
    linkCurrent: '/#',
  },
  About: {
    title: 'О компании',
    link: '/#',
    linkCurrent: '/#',
  },
} as const;

function HeaderNavigation(): JSX.Element {
  const {pathname} = useLocation();

  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        {Object.entries(HeaderNavigationLink)
          .map(([key, value]) => {
            const clsLink = cn('link main-nav__link', {
              'link--current': pathname.includes(value.linkCurrent),
            });

            return (
              <li key={key}>
                <Link
                  className={clsLink}
                  to={value.link}
                >
                  {value.title}
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}

export default HeaderNavigation;
