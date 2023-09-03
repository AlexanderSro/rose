import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

function Product({ product }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const description =
    windowWidth <= 768 ? product.s_description : product.description;

  return (
    <Card className="my-3 p-1 rounded card shadow-lg product-card">
      <div className="position-relative">
        <Link to={`/product/${product._id}`}>
          <Card.Img variant="top" src={product.image} className="product-image" />
          <div className="position-absolute bottom-0 start-50 translate-middle badge rounded-pill bg-danger product-price-badge">
            {product.price} RON
          </div>
        </Link>
      </div>
      <Card.Body className="product-card-body">
        <Card.Title className="product-name">
          {product.name}
        </Card.Title>
        <Card.Text className="product-description">
          {description}
        </Card.Text>
        <Card.Text as="div" className="product-review">
          <div className="my-3">
            <Rating
              value={product.rating}
              text={`${product.numReviews} recenzii`}
              color={"#f8e825"}
            />
          </div>
        </Card.Text>
        <Card.Text as="h5" className="product-footer-price">
          {product.price} RON
        </Card.Text>
        <Link to={`/product/${product._id}`}>
          <Button
            variant="outline-warning"
            className="rounded-pill product-detail-button"
          >
            Detailii
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default Product;
