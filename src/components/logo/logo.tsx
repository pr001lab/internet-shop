import cn from 'classnames';
import {Link, useLocation} from 'react-router-dom';
import {AppRoute, LogoComponent} from '../../const';
import styles from './logo.module.css';

type ComponentProps = {
  logoComponent: string,
}

function Logo({logoComponent}: ComponentProps): JSX.Element {
  const {pathname} = useLocation();

  const logoLink = cn('logo', {
    'header__logo': logoComponent === LogoComponent.Header,
    'footer__logo': logoComponent === LogoComponent.Footer,
    [styles.inactiveLink]: pathname.includes(AppRoute.Catalog),
  });

  return (
    <Link to={AppRoute.Main} className={logoLink}>
      <img
        className="logo__img"
        width="70"
        height="70"
        src="/img/svg/logo.svg"
        alt="Логотип"
      />
    </Link>
  );
}

export default Logo;
