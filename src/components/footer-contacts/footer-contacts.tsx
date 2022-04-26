function FooterContacts(): JSX.Element {
  return (
    <section className="footer__nav-section footer__nav-section--contacts">
      <h2 className="footer__nav-title">
      Контакты
      </h2>
      <p className="footer__nav-content">
      г. Санкт-Петербург,<br /> м.Невский проспект, <br />ул. Казанская 6.
      </p>
      <div className="footer__nav-content">
        <svg
          className="footer__icon"
          width="8"
          height="8"
          aria-hidden="true"
        >
          <use xlinkHref="#icon-phone" />
        </svg>
        <a className="link" href="tel:88125005050">
        8-812-500-50-50
        </a>
      </div>
      <p className="footer__nav-content">
        Режим работы:
        <br />
        <span className="footer__span">
          <svg
            className="footer__icon"
            width="13"
            height="13"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-clock" />
          </svg>
          <span>с 11:00 до 20:00</span>
          <span>без выходных</span>
        </span>
      </p>
    </section>
  );
}

export default FooterContacts;
