import cn from 'classnames';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import style from './page-404.module.css';

function Page404(): JSX.Element {
  const mainClass = cn(style.container, 'main-index');

  return (
    <main className={mainClass}>
      <Link to={AppRoute.Main}>
        <img className={style['logo-404']}
          width="300"
          src="/img/svg/logo.svg"
          alt="Логотип проекта"
        />
      </Link>

      <h1>К сожалению, ничего не найдено</h1>
      <h2>Error: 404 Not Found</h2>
      <Link to={AppRoute.Main}>Вернуться на главную страницу</Link>

    </main>
  );
}

export default Page404;
