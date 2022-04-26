import {Link} from 'react-router-dom';

const FooterNavigationLink = {
  WhereToBuy: 'Где купить?',
  Blog: 'Блог',
  Faq: 'Вопрос - ответ',
  Return: 'Возврат',
  Services: 'Сервис-центры',
} as const;

function FooterNavigation(): JSX.Element {
  return (
    <section className="footer__nav-section footer__nav-section--links">
      <h2 className="footer__nav-title">
        Информация
      </h2>
      <ul className="footer__nav-list">
        {Object.entries(FooterNavigationLink)
          .map(([key, value]) => (
            <li key={key} className="footer__nav-list-item">
              <Link className="link" to="#top">
                {value}
              </Link>
            </li>
          ))}
      </ul>
    </section>
  );
}

export default FooterNavigation;
