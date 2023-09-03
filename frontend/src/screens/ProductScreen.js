import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";

import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";

function ProductScreen() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const addToCartHandler = () => {
    dispatch(addToCart(id, 1)); 
  };

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [id, dispatch]);

  return (
    <Container className="mt-1">
      <Link
        to="/"
        className="dynamic-back-btn"
        style={{ textDecoration: "none" }}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
        Inapoi
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <div style={{ position: "relative" }}>
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.name}
                style={{
                  maxHeight: "500px",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
              <Badge
                bg={product.countInStock ? "success" : "danger"}
                className="rounded-pill w-30 mt-auto"
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                }}
              >
                {product.countInStock ? "In Stock" : "Out of Stock"}
              </Badge>
              <Badge
                bg="warning"
                className="mb-3 rounded-pill"
                style={{
                  position: "absolute",
                  top: "5px",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                {product.category}
              </Badge>
            </div>
          </Col>

          <Col md={6}>
            <Card className="h-100 shadow-lg border-0">
              <Card.Body className="d-flex flex-column">
                <Card.Title className="text-center mb-4">
                  {product.name}
                </Card.Title>
                <Card.Text className="mb-3">{product.description}</Card.Text>
                <h3 className="my-3 text-danger">{product.price} RON</h3>
                <div className="mb-3">
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} recenzii`}
                    color={"#f8e825"}
                  />
                </div>
                <Button
                  disabled={product.countInStock === 0}
                  variant="success"
                  className="rounded-pill w-100 mt-auto"
                  onClick={addToCartHandler}
                >
                  Adauga in cos
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default ProductScreen;


