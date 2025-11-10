import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { supabase } from '../utils/supabase'
import ProductCard from '../components/ProductCard'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(8)

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="top">
        <h1 className="visually-hidden">Rotano - ротанг от производителя</h1>
        <div className="top-slider">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              nextEl: '.top-slider-button-next',
              prevEl: '.top-slider-button-prev'
            }}
            pagination={{ el: '.top-slider-pagination', clickable: true }}
            loop={true}
            className="swiper-wrapper"
          >
            <SwiperSlide className="swiper-slide swiper-slide--light">
              <div className="img-wrapper">
                <img src="/img/img11.jpg" alt="Ротанг"/>
              </div>
              <div className="container">
                <div className="txt-wrapper">
                  <h2 className="top-h2">Искусственный ротанг для плетения</h2>
                  <p>Только в июле огромные скидки на полутрубку</p>
                  <Link to="/catalog">
                    <span>Продукция</span>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide swiper-slide--dark">
              <div className="img-wrapper">
                <img src="/img/img12.jpg" alt="Ротанг"/>
              </div>
              <div className="container">
                <div className="txt-wrapper">
                  <h2 className="top-h2">Летние цены на ротанг для плетения</h2>
                  <p>Весь июль - специальные предложения и скидки</p>
                  <Link to="/catalog">
                    <span>Продукция</span>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          <div className="slider-btns">
            <div className="top-slider-pagination"></div>
            <div className="btns">
              <button className="top-slider-button-prev">
                <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.2227 1.53516L2.0006 9.75716L10.2227 17.9792" stroke="white" strokeWidth="2.43828" strokeLinecap="round"/>
                </svg>
              </button>
              <button className="top-slider-button-next">
                <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.22266 1.53516L9.44471 9.75717L1.22266 17.9792" stroke="white" strokeWidth="2.43828" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="categories">
        <div className="container">
          <h2>Категории продукции</h2>
          <ul className="categories-list">
            <li><Link to="/catalog">Ротанг полутрубка</Link></li>
            <li><Link to="/catalog">Ротанг полумесяц</Link></li>
            <li><Link to="/catalog">Ротанг лента</Link></li>
            <li><Link to="/catalog">Ротанг пруток</Link></li>
            <li><Link to="/catalog">Сварочный пруток</Link></li>
          </ul>
        </div>
      </section>

      <section className="catalog-section">
        <div className="container">
          <div className="title-wrapper">
            <h2>Популярные товары</h2>
            <Link to="/catalog" className="all-link">Смотреть все</Link>
          </div>
          {loading ? (
            <p>Загрузка...</p>
          ) : (
            <ul className="catalog-list">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  )
}

export default Home
