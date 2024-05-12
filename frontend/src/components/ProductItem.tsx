import { ProductType } from '../types/ProductType'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import { Button, Card } from 'react-bootstrap'

function ProductItem({ product }: { product: ProductType }) {
  return (
    <Card>
      <Link to={`/product/` + product.slug}>
        <img src={product.image} className="card-img-top" alt={product.name} />
        {/* <h2>{product.name}</h2>
        <p>${product.price}</p> */}
      </Link>
      <Card.Body>
        {/* Product Name */}
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>

        {/* Rating */}
        <Rating rating={product.rating} numReviews={product.numReviews} />

        {/* Product Price */}
        <Card.Text>${product.price}</Card.Text>

        {/* Button */}
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button>Add to cart</Button>
        )}
      </Card.Body>
    </Card>
  )
}

export default ProductItem
