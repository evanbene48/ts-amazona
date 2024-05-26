import { ApiError } from '../types/ApiError'
import { CartItem } from '../types/CartType'
import { ProductType } from '../types/ProductType'

export const getError = (error: ApiError) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message
}

export const convertProductToCartItem = (product: ProductType): CartItem => {
  const cartItem: CartItem = {
    _id: product._id,
    name: product.name,
    slug: product.slug,
    image: product.image,
    price: product.price,
    countInStock: product.countInStock,
    quantity: 1,
  }
  return cartItem
}
