import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../utils/supabase'
import { useCart } from '../context/CartContext'

const Product = () => {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    fetchProduct()
  }, [slug])

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .maybeSingle()

      if (error) throw error
      setProduct(data)
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
      alert('Товар добавлен в корзину!')
    }
  }

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta))
  }

  if (loading) return <p>Загрузка...</p>
  if (!product) return <p>Товар не найден</p>

  return (
    <>
      <div className="breadcrumbs">
        <div className="container">
          <ul className="breadcrumbs-list">
            <li><a href="/">Главная</a></li>
            <li><a href="/catalog">Продукция</a></li>
            <li><a>{product.name}</a></li>
          </ul>
        </div>
      </div>

      <section className="item">
        <div className="container">
          <div className="item-top">
            <div className="img-wrapper">
              <img src={product.image_url} alt={product.name}/>
            </div>
            <div className="info-wrapper">
              <h1>{product.name}</h1>
              <p className="price">
                <span>{product.price.toLocaleString('ru-RU')}&nbsp;₽</span>/{product.price_unit}
              </p>
              {product.description && (
                <div className="description">
                  <p>{product.description}</p>
                </div>
              )}
              <div className="cart-controls">
                <div className="quantity-wrapper">
                  <button className="btn-minus" onClick={() => handleQuantityChange(-1)}>
                    <svg width="8" height="2" viewBox="0 0 8 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.51681 1.92585H1.26281C1.06681 1.92585 0.912813 1.87451 0.800813 1.77185C0.688813 1.65985 0.632812 1.50585 0.632812 1.30985C0.632812 1.11385 0.688813 0.964514 0.800813 0.861848C0.912813 0.749848 1.06681 0.693848 1.26281 0.693848H3.51681H4.80481H7.05881C7.26415 0.693848 7.41815 0.749848 7.52081 0.861848C7.63281 0.964514 7.68881 1.11385 7.68881 1.30985C7.68881 1.50585 7.63281 1.65985 7.52081 1.77185C7.41815 1.87451 7.26415 1.92585 7.05881 1.92585H4.80481H3.51681Z" fill="white"/>
                    </svg>
                  </button>
                  <input type="text" value={quantity} readOnly/>
                  <button className="btn-plus" onClick={() => handleQuantityChange(1)}>
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.31836 5.61084V8.59814H3.52734V5.61084H0.738281V3.86768H3.52734V0.914551H5.31836V3.86768H8.10742V5.61084H5.31836Z" fill="white"/>
                    </svg>
                  </button>
                </div>
                <button className="cart-btn" onClick={handleAddToCart}>
                  <span>В корзину</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Product
