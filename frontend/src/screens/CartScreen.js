import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, adjustCartQty } from "../actions/cartActions";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function CartScreen() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleQtyChange = (productId, qty) => {
    if (qty >= 0) {
      // Ensure qty doesn't go below 0
      dispatch(adjustCartQty(productId, qty));
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const shippingCost = subtotal > 500 ? 0 : 50; // Free shipping for orders over 500
  const discount = subtotal > 1000 ? 100 : 0; // Discount of 100 for orders over 1000
  const total = subtotal + shippingCost - discount;

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart"));
    if (localCart) {
      // Dispatch action to set cart from local storage
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Container className="mt-5">
      <h2 className="mb-4" style={{ color: "#ffffff8c" }}>
        Shopping Cart
      </h2>
      <Row>
        <Col xs={12} md={8}>
          {cartItems.map((item) => (
            <Card key={item.product} className="mb-3 cart-item">
              <Card.Body>
                <Row className="align-items-center">
                  <Col xs={4} md={2}>
                    <Card.Img
                      src={item.image}
                      alt={item.name}
                      className="product-image"
                    />
                  </Col>
                  <Col xs={8} md={4}>
                    <Card.Title className="cart-item-name">
                      {item.name}
                    </Card.Title>
                    <Card.Text className="cart-item-price">
                      ${item.price}
                    </Card.Text>
                  </Col>
                  <Col xs={6} md={6} lg={4} className="cart-item-qty">
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() =>
                        handleQtyChange(item.product, item.qty - 1)
                      }
                      className="qty-btn"
                    >
                      -
                    </Button>
                    {item.qty}
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() =>
                        handleQtyChange(item.product, item.qty + 1)
                      }
                      className="qty-btn"
                    >
                      +
                    </Button>
                  </Col>
                  <Col
                    xs={6}
                    md={8}
                    lg={2}
                    className="d-flex align-items-center justify-content-end"
                  >
                    <Button
                      className="remove-btn rounded-pill"
                      variant="outline-danger"
                      onClick={() => handleRemove(item.product)}
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Col>

        <Col xs={12} sm={12} md={4} lg={2}>
          <Card>
            <Card.Body>
              <Card.Text>
                <strong>Subtotal:</strong> {subtotal} RON
              </Card.Text>
              <Card.Text>
                <strong>Cost Livrare:</strong> {shippingCost} RON
              </Card.Text>
              <Card.Text>
                <strong>Discount:</strong> -{discount} RON
              </Card.Text>
              <Card.Text>
                <strong>Total:</strong> {total} RON
              </Card.Text>
              <Link
                to="/"
                className="btn btn-dark d-block mb-2 continue-btn rounded-pill"
              >
                Continua cumparaturile
              </Link>
              <LinkContainer to="/shipping">
                <Button 
                  variant="success"
                  className="w-100 checkout-btn rounded-pill"
                  disabled={!Array.isArray(cartItems) || cartItems.length === 0}
                >
                  Finalizeaza comanda
                </Button>
              </LinkContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default CartScreen;
