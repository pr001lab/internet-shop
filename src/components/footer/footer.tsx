import {LogoComponent} from '../../const';
import FooterContacts from '../footer-contacts/footer-contacts';
import FooterInfo from '../footer-info/footer-info';
import FooterNavigation from '../footer-navigation/footer-navigation';
import FooterSocials from '../footer-socials/footer-socials';
import Logo from '../logo/logo';

function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <Logo logoComponent={LogoComponent.Footer} />
        <FooterSocials />
        <FooterInfo />
        <FooterNavigation />
        <FooterContacts />
      </div>
    </footer>
  );
}

export default Footer;
