import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabase'
import { useCart } from '../context/CartContext'

const Checkout = () => {
  const navigate = useNavigate()
  const { cartItems, getCartTotal, clearCart } = useCart()
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    deliveryMethod: 'tk',
    paymentMethod: 'online',
    deliveryAddress: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const orderData = {
        customer_name: formData.customerName,
        customer_email: formData.customerEmail,
        customer_phone: formData.customerPhone,
        delivery_method: formData.deliveryMethod,
        payment_method: formData.paymentMethod,
        delivery_address: formData.deliveryAddress,
        total_amount: getCartTotal(),
        discount_amount: 0,
        status: 'pending'
      }

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single()

      if (orderError) throw orderError

      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

      if (itemsError) throw itemsError

      clearCart()
      alert('Заказ успешно оформлен!')
      navigate('/')
    } catch (error) {
      console.error('Error creating order:', error)
      alert('Ошибка при оформлении заказа')
    } finally {
      setLoading(false)
    }
  }

  if (cartItems.length === 0) {
    return (
      <section className="order">
        <div className="container">
          <h1>Корзина пуста</h1>
          <a href="/catalog">Перейти в каталог</a>
        </div>
      </section>
    )
  }

  return (
    <>
      <div className="breadcrumbs">
        <div className="container">
          <ul className="breadcrumbs-list">
            <li><a href="/">Главная</a></li>
            <li><a>Оформление заказа</a></li>
          </ul>
        </div>
      </div>

      <section className="order">
        <div className="container">
          <h1 className="h1">Оформление заказа</h1>
          <form onSubmit={handleSubmit} className="inner-wrapper">
            <div className="order-wrapper">
              <h3>Способ доставки</h3>
              <div className="delivery-company">
                <div className="checkbox-wrapper">
                  <input
                    type="radio"
                    id="tk"
                    name="deliveryMethod"
                    value="tk"
                    checked={formData.deliveryMethod === 'tk'}
                    onChange={handleChange}
                  />
                  <label htmlFor="tk">
                    <h6>Транспортной компанией</h6>
                  </label>
                </div>
                <div className="checkbox-wrapper">
                  <input
                    type="radio"
                    id="post"
                    name="deliveryMethod"
                    value="post"
                    checked={formData.deliveryMethod === 'post'}
                    onChange={handleChange}
                  />
                  <label htmlFor="post">
                    <h6>Почтой России</h6>
                  </label>
                </div>
              </div>

              <div className="payment-method">
                <h5>Способ оплаты</h5>
                <div className="checkbox-wrapper">
                  <input
                    type="radio"
                    id="online"
                    name="paymentMethod"
                    value="online"
                    checked={formData.paymentMethod === 'online'}
                    onChange={handleChange}
                  />
                  <label htmlFor="online">
                    <h6>Онлайн оплата</h6>
                  </label>
                </div>
                <div className="checkbox-wrapper">
                  <input
                    type="radio"
                    id="invoice"
                    name="paymentMethod"
                    value="invoice"
                    checked={formData.paymentMethod === 'invoice'}
                    onChange={handleChange}
                  />
                  <label htmlFor="invoice">
                    <h6>По счету</h6>
                  </label>
                </div>
              </div>

              <div className="data-wrapper">
                <h5>Ваши данные</h5>
                <input
                  type="text"
                  name="customerName"
                  placeholder="Имя"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="customerEmail"
                  placeholder="E-mail"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  name="customerPhone"
                  placeholder="Телефон"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="deliveryAddress"
                  placeholder="Адрес доставки"
                  value={formData.deliveryAddress}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="aside-wrapper">
              <div className="order-aside">
                <h6 className="price">
                  <span>Итого</span>
                  <span>{getCartTotal().toLocaleString('ru-RU')}&nbsp;₽</span>
                </h6>
                <p className="delivery">
                  <span>доставка</span>
                  <span>Уточняется</span>
                </p>
                <button type="submit" disabled={loading}>
                  <span>{loading ? 'Оформление...' : 'Оформить заказ'}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Checkout
