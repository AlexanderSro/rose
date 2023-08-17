import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import Rating from "../components/Rating";

function ProductScreen() {
  const { id } = useParams();

  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
    }
    fetchProduct();
  }, [id]);

  return (
    <Container className="mt-5">
      <Link
        to="/"
        className="dynamic-back-btn"
        style={{ textDecoration: "none" }}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
        Inapoi
      </Link>

      <Row>
        <Col md={6}>
          <div style={{ position: "relative" }}>
            <Card.Img
              variant="top"
              src={product.image}
              alt={product.name}
              style={{ maxHeight: "500px", width: "100%", objectFit: "cover" }}
            />
            <Badge
              bg={product.countInStock ? "success" : "danger"}
              className="rounded-pill w-30 mt-auto"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
              }}
            >
              {product.countInStock ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>
        </Col>

        <Col md={6}>
          <Card className="h-100 shadow-lg border-0">
            <Card.Body className="d-flex flex-column">
              <Card.Title className="text-center mb-4">
                {product.name}
              </Card.Title>
              <Badge
                bg="warning"
                className="mb-3 rounded-pill"
                style={{ position: "absolute", top: "15px", right: "10px" }}
              >
                {product.category}
              </Badge>
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
              >
                Adauga in cos
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductScreen;
