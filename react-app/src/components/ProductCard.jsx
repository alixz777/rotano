import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  return (
    <li className="catalog-list__item">
      <Link to={`/product/${product.slug}`}></Link>
      <div className="img-wrapper">
        <ul className="badge-list">
          {product.is_bestseller && <li className="badge badge--bestseller">Бестселлер</li>}
          {product.is_new && <li className="badge badge--news">Новинка</li>}
        </ul>
        <img src={product.image_url} alt={product.name}/>
      </div>
      <h6 className="name">{product.name}</h6>
      <p className="price">
        <span>{product.price.toLocaleString('ru-RU')}&nbsp;₽</span>/{product.price_unit}
      </p>
    </li>
  )
}

export default ProductCard
