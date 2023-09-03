import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, FormGroup, FormLabel } from "react-bootstrap";
import { saveShippingAddress } from "../actions/cartActions"; // Import the action

import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";

function ShippingScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [name, setName] = useState(shippingAddress?.name);
  const [firstName, setFirstName] = useState(shippingAddress?.firstName);
  const [address, setAddress] = useState(shippingAddress?.address);
  const [city, setCity] = useState(shippingAddress?.city);
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode);
  const [country, setCountry] = useState(shippingAddress?.country);
  const [telNumber, setTelNumber] = useState(shippingAddress?.telNumber);

  const dispatch = useDispatch(); // You already have this

  const submitHandler = (e) => {
    e.preventDefault();
    // Dispatch the action to save the shipping address
    dispatch(
      saveShippingAddress({
        firstName,
        name,
        address,
        city,
        postalCode,
        country,
        telNumber,
      })
    );
    console.log("submit");
  };

  return (
    <FormContainer>
      <CheckoutSteps />
      <h1 style={{ color: "whitesmoke" }}>Adresa de livrare</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="firstName">
          <FormLabel>Prenume</FormLabel>
          <Form.Control
            required
            type="text"
            placeholder="Prenume"
            value={firstName ? firstName : ""}
            onChange={(e) => setFirstName(e.target.value)}
          ></Form.Control>
        </FormGroup>

        <FormGroup controlId="name">
          <FormLabel>Nume de familie</FormLabel>
          <Form.Control
            required
            type="text"
            placeholder="Nume de familie"
            value={name ? name : ""}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </FormGroup>

        <FormGroup controlId="country">
          <FormLabel>Tara</FormLabel>
          <Form.Control
            required
            type="text"
            placeholder="Tara"
            value={country ? country : ""}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </FormGroup>

        <FormGroup controlId="address">
          <FormLabel>Adresa</FormLabel>
          <Form.Control
            required
            type="text"
            placeholder="Adresa"
            value={address ? address : ""}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </FormGroup>

        <FormGroup controlId="city">
          <FormLabel>Localitate</FormLabel>
          <Form.Control
            required
            type="text"
            placeholder="Localitate"
            value={city ? city : ""}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </FormGroup>

        <FormGroup controlId="postalcode">
          <FormLabel>Cod Postal</FormLabel>
          <Form.Control
            required
            type="text"
            placeholder="Cod Postal"
            value={postalCode ? postalCode : ""}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </FormGroup>

        <FormGroup controlId="telNumber">
          <FormLabel>Telefon</FormLabel>
          <Form.Control
            required
            type="text"
            placeholder="Telefon"
            value={telNumber ? telNumber : ""}
            onChange={(e) => setTelNumber(e.target.value)}
          ></Form.Control>
        </FormGroup>

        <Button className="btn-login mt-2" type="submit" varian="success">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;
