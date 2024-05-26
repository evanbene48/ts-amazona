import { ProductType } from '../types/ProductType'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import { Button, Card } from 'react-bootstrap'
import { useContext } from 'react'
import { Store } from '../Store'
import { CartItem } from '../types/CartType'
import { convertProductToCartItem } from '../utils/util'

function ProductItem({ product }: { product: ProductType }) {
  const { state, dispatch } = useContext(Store)

  const {
    cart: { cartItems },
  } = state

  const addToCartHandler = (item: CartItem) => {
    const existItem = cartItems.find((x: CartItem) => x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    if (product.countInStock < quantity) {
      alert('Sorry. Product is out of stock')
      return
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    })
  }

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
          <Button
            onClick={() => addToCartHandler(convertProductToCartItem(product))}
          >
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}

export default ProductItem
