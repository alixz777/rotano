import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useState } from 'react'

const Header = ({ variant = 'default' }) => {
  const { getCartCount } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
    document.body.classList.toggle('freeze')
  }

  const headerClass = variant === 'inner' ? 'header header--inner' : 'header'

  return (
    <header className={`${headerClass} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="container">
        <div className="header-top">
          <div className="city-wrapper">
            <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.53906 8.08071C1.53906 4.4372 4.71277 1.48355 8.62774 1.48355C12.5427 1.48355 15.7164 4.4372 15.7164 8.08071C15.7164 11.6957 13.454 15.914 9.92402 17.4225C9.10113 17.7742 8.15434 17.7742 7.33146 17.4225C3.80152 15.914 1.53906 11.6957 1.53906 8.08071Z" stroke="#0A1922" strokeWidth="1.5"/>
              <path d="M10.6522 8.57139C10.6522 9.68995 9.74546 10.5967 8.6269 10.5967C7.50834 10.5967 6.60156 9.68995 6.60156 8.57139C6.60156 7.45282 7.50834 6.54605 8.6269 6.54605C9.74546 6.54605 10.6522 7.45282 10.6522 8.57139Z" stroke="#0A1922" strokeWidth="1.5"/>
            </svg>
            <span>Череповец</span>
          </div>
          <nav>
            <a href="#">Компания</a>
            <a href="#">Оплата и&nbsp;доставка</a>
            <a href="#">Контакты</a>
          </nav>
          <a className="tel-link" href="tel:+78202610351">+7 8202 61 03 51</a>
          <a className="feedback-link" href="#">
            <span>Напишите нам</span>
          </a>
          <ul className="markets-list">
            <li><a href="#">Wildberies</a></li>
            <li><a href="#">Ozon</a></li>
          </ul>
        </div>
        <div className="header-bottom">
          <Link className="logo" to="/"></Link>
          <Link className="catalog-link" to="/catalog">
            <svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.40625 1.20673H17.6492" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M1.40625 7.49384H17.6492" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M1.40625 13.7809H17.6492" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>Каталог</span>
          </Link>
          <div className="input-wrapper">
            <input type="text" placeholder="Я ищу..."/>
            <button className="input-btn">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8.51433" cy="8.62144" r="7.31901" stroke="#98A3AD" strokeWidth="1.5"/>
                <path d="M13.9062 14.0153L16.6027 16.7118" stroke="#98A3AD" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <a className="user-link" href="#">
            <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8.02734" cy="4.97296" r="4" stroke="#0A1922" strokeWidth="1.5"/>
              <ellipse cx="8.02734" cy="15.973" rx="7" ry="4" stroke="#0A1922" strokeWidth="1.5"/>
            </svg>
            <span>Войти</span>
          </a>
          <a className="featured-link" href="#">
            <svg width="23" height="19" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.23908 16.4915L8.70339 15.9025L8.23908 16.4915ZM11.2773 3.08126L10.737 3.60136C10.8784 3.74826 11.0735 3.83126 11.2773 3.83126C11.4812 3.83126 11.6763 3.74826 11.8177 3.60136L11.2773 3.08126ZM14.3156 16.4915L14.7799 17.0805L14.3156 16.4915ZM8.23908 16.4915L8.70339 15.9025C7.18773 14.7077 5.53041 13.5409 4.21563 12.0604C2.92656 10.6089 2.02734 8.91513 2.02734 6.71772H1.27734H0.527344C0.527344 9.38326 1.63784 11.4167 3.09406 13.0564C4.52457 14.6672 6.34811 15.9558 7.77476 17.0805L8.23908 16.4915ZM1.27734 6.71772H2.02734C2.02734 4.56686 3.24271 2.76315 4.9017 2.00482C6.51341 1.2681 8.67901 1.4632 10.737 3.60136L11.2773 3.08126L11.8177 2.56116C9.37584 0.0241487 6.54144 -0.393986 4.27811 0.640588C2.06206 1.65355 0.527344 4.00566 0.527344 6.71772H1.27734ZM8.23908 16.4915L7.77476 17.0805C8.287 17.4843 8.83689 17.9149 9.39417 18.2405C9.9512 18.566 10.5869 18.8306 11.2773 18.8306V18.0806V17.3306C10.9677 17.3306 10.6035 17.2099 10.151 16.9454C9.69866 16.6812 9.22942 16.3172 8.70339 15.9025L8.23908 16.4915ZM14.3156 16.4915L14.7799 17.0805C16.2066 15.9558 18.0301 14.6672 19.4606 13.0564C20.9168 11.4167 22.0273 9.38326 22.0273 6.71772H21.2773H20.5273C20.5273 8.91513 19.6281 10.6089 18.3391 12.0604C17.0243 13.5409 15.367 14.7077 13.8513 15.9025L14.3156 16.4915ZM21.2773 6.71772H22.0273C22.0273 4.00566 20.4926 1.65355 18.2766 0.640588C16.0133 -0.393986 13.1788 0.0241487 10.737 2.56116L11.2773 3.08126L11.8177 3.60136C13.8757 1.4632 16.0413 1.2681 17.653 2.00482C19.312 2.76315 20.5273 4.56686 20.5273 6.71772H21.2773ZM14.3156 16.4915L13.8513 15.9025C13.3253 16.3172 12.856 16.6812 12.4037 16.9454C11.9512 17.2099 11.5869 17.3306 11.2773 17.3306V18.0806V18.8306C11.9677 18.8306 12.6035 18.566 13.1605 18.2405C13.7178 17.9149 14.2677 17.4843 14.7799 17.0805L14.3156 16.4915Z" fill="#0A1922"/>
            </svg>
            <span>Избранное</span>
          </a>
          <Link className="mobile-logo" to="/">
            <img src="/img/logo2.png" alt="Rotano"/>
          </Link>
          <Link className="cart-link" to="/cart">
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.44531 1.47296L1.71022 1.56127C3.03026 2.00128 3.69028 2.22128 4.0678 2.74506C4.44531 3.26883 4.44531 3.96456 4.44531 5.356V7.97296C4.44531 10.8014 4.44531 12.2156 5.32399 13.0943C6.20267 13.973 7.61689 13.973 10.4453 13.973H18.4453" stroke="#0A1922" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M6.94531 16.473C7.77374 16.473 8.44531 17.1445 8.44531 17.973C8.44531 18.8014 7.77374 19.473 6.94531 19.473C6.11689 19.473 5.44531 18.8014 5.44531 17.973C5.44531 17.1445 6.11689 16.473 6.94531 16.473Z" stroke="#0A1922" strokeWidth="1.5"/>
              <path d="M15.9453 16.473C16.7737 16.473 17.4453 17.1446 17.4453 17.973C17.4453 18.8015 16.7737 19.473 15.9453 19.473C15.1169 19.473 14.4453 18.8015 14.4453 17.973C14.4453 17.1446 15.1169 16.473 15.9453 16.473Z" stroke="#0A1922" strokeWidth="1.5"/>
              <path d="M10.4453 7.47296H7.44531" stroke="#0A1922" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M4.44531 4.47296H15.8957C17.9507 4.47296 18.9782 4.47296 19.4228 5.14722C19.8674 5.82149 19.4626 6.7659 18.6531 8.65472L18.2246 9.65472C17.8466 10.5366 17.6577 10.9775 17.282 11.2252C16.9062 11.473 16.4265 11.473 15.4671 11.473H4.44531" stroke="#0A1922" strokeWidth="1.5"/>
            </svg>
            {getCartCount() > 0 && <span className="num">{getCartCount()}</span>}
            <span>Корзина</span>
          </Link>
          <button className="burger" onClick={toggleMenu}>
            <svg className="close" width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.70282 2.13671L18.9183 2.13671" stroke="#464646" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M1.70282 9.13671L18.9183 9.13671" stroke="#464646" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M1.70282 16.1367L18.9183 16.1367" stroke="#464646" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <svg className="open" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.29089 2.13671L18.5064 18.2286" stroke="#464646" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M18.5064 2.13671L1.29089 18.2286" stroke="#464646" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div className="mobile-menu">
          <div className="input-wrapper">
            <input type="text" placeholder="Я ищу"/>
          </div>
          <ul className="catalog-links">
            <li><Link to="/catalog">Ротанг полутрубка</Link></li>
            <li><Link to="/catalog">Ротанг полумесяц</Link></li>
            <li><Link to="/catalog">Ротанг лента</Link></li>
            <li><Link to="/catalog">Ротанг пруток</Link></li>
            <li><Link to="/catalog">Сварочный пруток для&nbsp;полимеров</Link></li>
          </ul>
          <nav>
            <a href="#">О&nbsp;компании</a>
            <a href="#">Доставка и&nbsp;оплата</a>
          </nav>
          <div className="info-wrapper">
            <div className="row">
              <h6>Телефон центра продаж</h6>
              <a href="tel:+79111231234">8-911-123-1234</a>
            </div>
            <div className="row">
              <h6>E-mail</h6>
              <a href="mailto:info@rotano.ru">info@rotano.ru</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
