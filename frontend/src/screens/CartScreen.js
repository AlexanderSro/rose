import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, adjustCartQty } from "../actions/cartActions";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function CartScreen() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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
  const shippingCost = subtotal > 200 ? 0 : 25; // Free shipping for orders over 200
  const total = subtotal + shippingCost;

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
    <Container className="mt-5 container-cart">
      <h2 className="mb-4" style={{ color: "#ffffff8c" }}>
        Shopping Cart
      </h2>
      <Row>
        <Col sm={12} md={8}>
          {cartItems.map((item) => (
            <Card key={item.product} className="mb-3 cart-item">
              <Card.Body className="cart-item-details">
                <Col xs={2} sm={2}>
                  <Card.Img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                </Col>
                <Col xs={3} sm={3}>
                  <Card.Title className="cart-item-name">
                    {item.name}
                  </Card.Title>
                </Col>
                <Col xs={2} sm={2}>
                  <Card.Text className="cart-item-price">
                    {item.price * item.qty} RON
                  </Card.Text>
                </Col>
                <Col xs={3} sm={3} className="cart-item-qty">
                  {/* Quantity Buttons */}
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    onClick={() => handleQtyChange(item.product, item.qty - 1)}
                  >
                    -
                  </Button>
                  {item.qty}
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    onClick={() => handleQtyChange(item.product, item.qty + 1)}
                  >
                    +
                  </Button>
                </Col>
                <Col xs={2} sm={2}>
                  <Button
                    variant="outline-danger"
                    className="remove-btn"
                    onClick={() => handleRemove(item.product)}
                  >
                    Remove
                  </Button>
                </Col>
              </Card.Body>
            </Card>
          ))}
        </Col>

        <Col sm={12} md={6} lg={4}>
          <Card>
            <Card.Body>
              <Card.Text>
                <strong>Subtotal:</strong> {subtotal} RON
              </Card.Text>
              <Card.Text>
                <strong>Cost Livrare:</strong> {shippingCost} RON
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
              {userInfo ? (
                <LinkContainer to="/shipping">
                  <Button
                    variant="success"
                    className="w-100 checkout-btn rounded-pill"
                  >
                    Finalizeaza comanda
                  </Button>
                </LinkContainer>
              ) : (
                <LinkContainer to="/login">
                  <Button
                    variant="success"
                    className="w-100 checkout-btn rounded-pill"
                  >
                    Inregistrativa pentru a finaliza
                  </Button>
                </LinkContainer>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default CartScreen;
