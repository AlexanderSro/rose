import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card, Carousel } from "react-bootstrap";
import { listRecommendedProducts } from "../actions/productActions"; // Import your action here
import Loader from "../components/Loader"; // Assuming you have a Loader component
import Message from "../components/Message"; // Assuming you have a Message component
import "./summaryscreen.css";

const SummaryScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showCartSummary, setShowCartSummary] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const recommendedProductList = useSelector(
    (state) => state.recommendedProductList || {}
  );
  const {
    loading,
    error,
    products: recommendedProducts = [],
  } = recommendedProductList;

  useEffect(() => {
    dispatch(listRecommendedProducts());
  }, [dispatch]);

  const filteredRecommendedProducts = recommendedProducts.filter(
    (recProduct) =>
      !cartItems.some((cartItem) => cartItem._id === recProduct._id)
  );

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <Container className="mt-5 summary">
      <h2>Order Summary</h2>

      <Card className="mb-3 summary-contact">
        <Card.Header>Contact Information</Card.Header>
        <Card.Body>
          Email: {userInfo ? userInfo.email : "Not logged in"}
        </Card.Body>
      </Card>

      <Card className="mb-3 summary-shipping">
        <Card.Header>Shipping Method</Card.Header>
        <Card.Body>Standard: FAN Courier - 20 RON</Card.Body>
      </Card>

      <Card className="mb-3 summary-card">
        <Card.Header
          className="summary-header"
          onClick={() => setShowCartSummary(!showCartSummary)}
        >
          <span className="summary-title">
            {showCartSummary
              ? "Ascunde rezumatul comenzii"
              : "Afiseaza rezumatul comemzii"}
          </span>
        </Card.Header>
        {showCartSummary && (
          <Card.Body>
            {cartItems.map((item, index) => (
              <Row className="summary-row" key={index}>
                <Col className="summary-col">
                  <img
                    src={item.image}
                    alt={item.name}
                    width="50"
                    height="50"
                  />
                </Col>
                <Col className="summary-col">{item.name}</Col>
                <Col className="summary-col">{item.qty}</Col>
                <Col className="summary-col">{item.price} RON</Col>
              </Row>
            ))}
            <hr />
            <Row>
              <Col>Total Price:</Col>
              <Col>{totalPrice} RON</Col>
            </Row>
          </Card.Body>
        )}
      </Card>

      <Button
        className="summary-button"
        variant="primary"
        onClick={() => navigate("/payment")}
      >
        Continue
      </Button>

      {/* Recommended Products */}
      <Container className="mt-5 recommended">
        <h2>Recommended Products</h2>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Carousel className="smaller-carousel">
            {filteredRecommendedProducts.map((product, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block smaller-image"
                  src={product.image}
                  alt={product.name}
                />
                <Carousel.Caption>
                  <h3>{product.name}</h3>
                  <button className="add-to-cart">Add to Cart</button>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </Container>
    </Container>
  );
};

export default SummaryScreen;
