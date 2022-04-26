import {LogoComponent} from '../../const';
import FormSearch from '../form-search/form-search';
import HeaderNavigationUser from '../header-navigation-user/header-navigation-user';
import HeaderNavigation from '../header-navigation/header-navigation';
import Logo from '../logo/logo';

function Header(): JSX.Element {
  return (
    <header
      className="header"
      id="header"
    >
      <div className="container header__wrapper">
        <Logo logoComponent={LogoComponent.Header} />
        <HeaderNavigation />
        <FormSearch />
        <HeaderNavigationUser />
      </div>
    </header>
  );
}

export default Header;
