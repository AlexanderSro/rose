import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import axios from 'axios';


function HomeScreen() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchProducts(){
      const { data } = await axios.get('/api/products/')
      setProducts(data)
    }
    fetchProducts()
  }, [])
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h1 className="d-none d-lg-block">Cele mai iubite produse</h1>
      <h5 className="d-lg-none">Cele mai iubite produse</h5>
      <Row>
        {products.map((product) => (
          <Col key={product._id} xs={6} sm={6} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomeScreen;
