import cn from 'classnames';
import {MouseEvent, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {AppRoute, LIMIT_PAGE, PaginationButton, PAGINATION_FIRST_PAGE} from '../../const';
import {selectGuitarsCount} from '../../store/dataGuitars/selectors';

function Pagination(): JSX.Element {
  const history = useHistory();
  const guitarsCount = useSelector(selectGuitarsCount);

  const pageLastCount = Math.ceil(guitarsCount / LIMIT_PAGE);

  const location = useLocation();
  const {numberPageUrl: numberPageUrlMemo} = useMemo(() => {
    const numberPageUrl = (location.pathname).replace(/[/catalog/page_]/ig, '');

    return {numberPageUrl};
  }, [location]);


  const handlePageButtonClick = (evt: MouseEvent<HTMLAnchorElement>, numberPage?: number) => {
    evt.preventDefault();

    let nextNumberPage;
    if (evt.currentTarget.innerText === PaginationButton.Next) {
      nextNumberPage = Number(numberPageUrlMemo) + 1;
    } else if (evt.currentTarget.innerText === PaginationButton.Back) {
      nextNumberPage = Number(numberPageUrlMemo) - 1;
    } else {
      nextNumberPage = numberPage;
    }

    const queryParams = new URLSearchParams(window.location.search);
    history.push(`${AppRoute.Catalog}${nextNumberPage}?${queryParams}`);
  };

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {Number(numberPageUrlMemo) !== PAGINATION_FIRST_PAGE && (
          <li className="pagination__page pagination__page--prev" id="prev">
            <Link
              className="link pagination__page-link"
              to={String(PAGINATION_FIRST_PAGE)}
              onClick={handlePageButtonClick}
            >
              {PaginationButton.Back}
            </Link>
          </li>
        )}
        {Array.from({length: pageLastCount}, (_, i) => i + PAGINATION_FIRST_PAGE).map((i) => {
          const isActivePageClass = cn('pagination__page', {
            'pagination__page--active': Number(numberPageUrlMemo) === i,
          });

          return (
            <li key={i} className={isActivePageClass}>
              <Link
                className="link pagination__page-link"
                to={String(i)}
                onClick={(evt) => handlePageButtonClick(evt, i)}
              >
                {i}
              </Link>
            </li>
          );
        })}
        {Number(numberPageUrlMemo) < pageLastCount && (
          <li className="pagination__page pagination__page--next" id="next">
            <Link
              className="link pagination__page-link"
              to={String(pageLastCount)}
              onClick={handlePageButtonClick}
            >
              {PaginationButton.Next}
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Pagination;
