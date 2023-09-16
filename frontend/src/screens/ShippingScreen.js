import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, FormGroup, FormLabel } from "react-bootstrap";
import { saveShippingAddress } from "../actions/cartActions";
import { useNavigate } from "react-router-dom";

import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import DynamicProgressBar from "../components/CheckoutSteps";

function ShippingScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const userInfo = useSelector((state) => state.userLogin.userInfo); // Import userInfo



  const [isAddressInitialized, setAddressInitialized] = useState(false); // State variable

  useEffect(() => {
    console.log("Running useEffect");

    if (!isAddressInitialized && userInfo) {
      if (!shippingAddress || shippingAddress?.userId !== userInfo._id) {
        console.log("Dispatching saveShippingAddress");
        dispatch(saveShippingAddress({ userId: userInfo._id })); // set userId
        setAddressInitialized(true); // Set flag to true to prevent further dispatch
      }
    }
  }, [userInfo, shippingAddress, dispatch, isAddressInitialized]);

  const [name, setName] = useState(shippingAddress?.name || "");
  const [firstName, setFirstName] = useState(shippingAddress?.firstName || "");
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");
  const [telNumber, setTelNumber] = useState(shippingAddress?.telNumber || "");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        userId: userInfo._id,
        firstName,
        name,
        address,
        city,
        postalCode,
        country,
        telNumber,
      })
    );
    navigate("/summary");
  };

  return (
    <FormContainer>
      <DynamicProgressBar step={1} />

      <h1 style={{ color: "whitesmoke" }}>Adresa de livrare</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="firstName">
          <FormLabel style={{color:"whitesmoke"}}>Prenume</FormLabel>
          <Form.Control
            required
            type="text"
            placeholder="Prenume"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="name">
          <FormLabel style={{color:"whitesmoke"}}>Nume de familie</FormLabel>
          <Form.Control
            required
            type="text"
            placeholder="Nume de familie"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="country">
          <FormLabel style={{color:"whitesmoke"}}>Tara</FormLabel>
          <Form.Control
            required
            type="text"
            placeholder="Tara"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="address">
          <FormLabel style={{color:"whitesmoke"}}>Adresa</FormLabel>
          <Form.Control
            required
            type="text"
            placeholder="Adresa"
            onChange={(e) => setAddress(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="city">
          <FormLabel style={{color:"whitesmoke"}}>Oras</FormLabel>
          <Form.Control
            required
            type="text"
            placeholder="Localitate"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="postalcode">
          <FormLabel style={{color:"whitesmoke"}}>Cod Postal</FormLabel>
          <Form.Control
            required
            type="text"
            placeholder="Cod Postal"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="telNumber">
          <FormLabel style={{color:"whitesmoke"}}>Telefon</FormLabel>
          <Form.Control
            required
            type="text"
            placeholder="Telefon"
            value={telNumber}
            onChange={(e) => setTelNumber(e.target.value)}
          />
        </FormGroup>
        <Button className="btn-login mt-2 rounded-pill" type="submit">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;
