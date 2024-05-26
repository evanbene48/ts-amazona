import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductDetailsBySlugQuery } from '../hooks/productHooks';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils/util';
import { ApiError } from '../types/ApiError';
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useContext } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { CartItem } from '../types/CartType';
import { convertProductToCartItem } from '../utils/util';

function ProductPage() {
  const params = useParams();
  const { slug } = params;

  const {
    data: product,
    isLoading,
    error,
    isError,
  } = useGetProductDetailsBySlugQuery(slug!);

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const navigate = useNavigate();

  const addToCartHandler = () => {
    const existItem = cart.cartItems.find(
      (x: CartItem) => x._id === product!._id
    );

    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product!.countInStock < quantity) {
      toast.warn('Sorry. Product is out of stock');
      return;
    }

    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...convertProductToCartItem(product!), quantity },
    });

    toast.success('Product added to the cart');

    navigate('/cart');
  };

  return isLoading ? (
    <LoadingBox />
  ) : isError ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : !product ? (
    <MessageBox variant="danger">Product Not Found</MessageBox>
  ) : (
    <div>
      {/* pindah helmetnya */}
      {/* <Helmet>
        <title>Product Page</title>
      </Helmet> */}

      <Row>
        {/* image */}
        <Col md={6}>
          <img className="large" src={product.image} alt={product.name}></img>
        </Col>

        {/* Price and description */}
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            </ListGroup.Item>
            <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
            <ListGroup.Item>
              Description:
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        {/* add to cart */}
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                {/* Price */}
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>

                {/* Status */}
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {/* status */}
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button onClick={addToCartHandler} variant="primary">
                        Add to Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductPage;
