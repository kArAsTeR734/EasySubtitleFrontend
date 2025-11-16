import './Footer.scss';
import {aboutLinks, translationLinks} from "../config/footerLinks.ts";

const Footer = () => {

  return (
      <>
        <section className="footer" id="footer">
          <div className="footer--inner container">
            <a href="#" className="footer__link">
              <img src="/src/assets/Logo.svg" alt="logo"/>
            </a>
            <div className="footer__wrapper">
              <div className="footer__block">
                <div className="footer__header">
                  О EazySubtitle
                </div>
                {aboutLinks.map(({label, href,}) => (
                    <div key={crypto.randomUUID()} className="footer__item">
                      <a href={href}  key={Date.now()} className="footer__link">{label}</a>
                    </div>
                ))}
              </div>
              <div className="footer__block">
                <div className="footer__header">
                  Перевод
                </div>
                {translationLinks.map(({label, href}) => (
                    <div key={crypto.randomUUID()} className="footer__item">
                      <a href={href} key={Date.now()} className="footer__link">{label}</a>
                    </div>
                ))}
              </div>
              <div className="footer__block">
                <div className="footer__header">Свяжитесь с нами</div>
                <a href="tel:+88003020412" className="footer__link">+7 (499) 922-89-74</a>
              </div>
            </div>
          </div>
        </section>

      </>
  );
};

export default Footer;