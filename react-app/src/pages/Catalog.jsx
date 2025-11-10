import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'
import ProductCard from '../components/ProductCard'

const Catalog = () => {
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
        .order('created_at', { ascending: false })

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
      <div className="breadcrumbs">
        <div className="container">
          <ul className="breadcrumbs-list">
            <li><a href="/">Главная</a></li>
            <li><a>Продукция</a></li>
          </ul>
        </div>
      </div>

      <section className="catalog">
        <div className="container">
          <div className="title-wrapper">
            <h1>Вся продукция</h1>
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

export default Catalog
