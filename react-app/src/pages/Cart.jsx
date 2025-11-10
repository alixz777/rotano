import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart()

  if (cartItems.length === 0) {
    return (
      <section className="cart">
        <div className="container">
          <h1>Корзина</h1>
          <p>Корзина пуста</p>
          <Link to="/catalog">Перейти в каталог</Link>
        </div>
      </section>
    )
  }

  return (
    <>
      <div className="breadcrumbs">
        <div className="container">
          <ul className="breadcrumbs-list">
            <li><Link to="/">Главная</Link></li>
            <li><a>Корзина</a></li>
          </ul>
        </div>
      </div>

      <section className="cart">
        <div className="container">
          <h1 className="h1">Корзина</h1>
          <ul className="cart-list">
            {cartItems.map(item => (
              <li key={item.id}>
                <div className="img-wrapper">
                  <img src={item.image_url} alt={item.name}/>
                </div>
                <Link className="name" to={`/product/${item.slug}`}>{item.name}</Link>
                <p className="price">
                  {item.price.toLocaleString('ru-RU')}&nbsp;₽/{item.price_unit}
                </p>
                <div className="quantity-wrapper">
                  <button className="btn-minus" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    <svg width="8" height="2" viewBox="0 0 8 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.51681 1.92585H1.26281C1.06681 1.92585 0.912813 1.87451 0.800813 1.77185C0.688813 1.65985 0.632812 1.50585 0.632812 1.30985C0.632812 1.11385 0.688813 0.964514 0.800813 0.861848C0.912813 0.749848 1.06681 0.693848 1.26281 0.693848H3.51681H4.80481H7.05881C7.26415 0.693848 7.41815 0.749848 7.52081 0.861848C7.63281 0.964514 7.68881 1.11385 7.68881 1.30985C7.68881 1.50585 7.63281 1.65985 7.52081 1.77185C7.41815 1.87451 7.26415 1.92585 7.05881 1.92585H4.80481H3.51681Z" fill="white"/>
                    </svg>
                  </button>
                  <input type="text" value={item.quantity} readOnly/>
                  <button className="btn-plus" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.31836 5.61084V8.59814H3.52734V5.61084H0.738281V3.86768H3.52734V0.914551H5.31836V3.86768H8.10742V5.61084H5.31836Z" fill="white"/>
                    </svg>
                  </button>
                </div>
                <p className="total-price">{(item.price * item.quantity).toLocaleString('ru-RU')}&nbsp;₽</p>
                <button className="del-btn" onClick={() => removeFromCart(item.id)}>
                  <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.2066 8.41064C17.2066 8.41064 16.6636 15.1456 16.3486 17.9826C16.1986 19.3376 15.3616 20.1316 13.9906 20.1566C11.3816 20.2036 8.76962 20.2066 6.16162 20.1516C4.84262 20.1246 4.01962 19.3206 3.87262 17.9896C3.55562 15.1276 3.01562 8.41064 3.01562 8.41064" stroke="#BABABA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.5908 5.18213H1.63281" stroke="#BABABA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15.3214 5.18285C14.5364 5.18285 13.8604 4.62785 13.7064 3.85885L13.4634 2.64285C13.3134 2.08185 12.8054 1.69385 12.2264 1.69385H7.99344C7.41444 1.69385 6.90644 2.08185 6.75644 2.64285L6.51344 3.85885C6.35944 4.62785 5.68344 5.18285 4.89844 5.18285" stroke="#BABABA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-bottom">
            <div className="txt-wrapper">
              <p className="price">Итого: <span>{getCartTotal().toLocaleString('ru-RU')} ₽</span></p>
              <Link className="cart-btn" to="/checkout">
                <span>Оформить заказ</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Cart
