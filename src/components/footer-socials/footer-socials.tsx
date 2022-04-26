export const footerSocialLinks = {
  facebook: 'https://www.facebook.com/',
  instagram: 'https://www.instagram.com/',
  twitter: 'https://www.twitter.com/',
} as const;

function FooterSocials(): JSX.Element {
  return (
    <div className="socials footer__socials">
      <ul className="socials__list">
        {Object.entries(footerSocialLinks)
          .map(([key, value]) => (
            <li key={key} className="socials-item">
              <a
                className="socials__link"
                href={value}
                aria-label={key}
              >
                <svg
                  className="socials__icon"
                  width="24"
                  height="24"
                  aria-hidden="true"
                >
                  <use xlinkHref={`#icon-${key}`} />
                </svg>
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default FooterSocials;
