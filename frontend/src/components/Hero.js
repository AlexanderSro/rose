import React from "react";
import { Carousel, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Hero() {
  return (
    <div className="hero-container">
      <Carousel className="hero-carousel">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/caise.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3 style={{ color: "#fff" }}>Zacusca si dulceata...</h3>
            <p>Cea mai buna dulceata de pe piata...</p>
            <LinkContainer to={"/shop"} style={{ borderRadius: "50px" }}>
              <Button variant="success">Comanda online</Button>
            </LinkContainer>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/logonou.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3 style={{ color: "#fff" }}>Zacusca si dulceata...</h3>
            <p>Cea mai tare zacusca de pe piata...</p>
            <LinkContainer to={"/shop"} style={{ borderRadius: "50px" }}>
              <Button variant="warning">Comanda online</Button>
            </LinkContainer>
          </Carousel.Caption>
        </Carousel.Item>
        {/* You can add more Carousel.Item as needed */}
      </Carousel>
    </div>
  );
}

export default Hero;
