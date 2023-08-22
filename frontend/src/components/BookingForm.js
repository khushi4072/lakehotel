import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const BookingForm = () => {
  const [name,setname] = useState("")
  const[mail,setmail]=useState("")
  const [checkin, setcheckin] = useState(" ")
  const [checkout, setcheckout] = useState(" ")
  const [guest, setguest] = useState("")
  const [text, settext] = useState("")


  const handleChange = async() => {
  
    
      var data1 = await fetch("http://localhost:5000/Order",{
        method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({})
      })
      data1 = await data1.json()
  
      var keys= await fetch("http://localhost:5000/key",{
        method: 'GET',
  
      })
      keys = await keys.json()
      // console.log(keys,"yes")
  
      // const keys='rzp_test_OmCfFJhnp3Fztn'
    
      var options = {
        key:keys.key, // Enter the Key ID generated from the Dashboard
        amount: 1000, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Acme Corp", //your business name
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: data1.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "http://localhost:5000/verification",
        prefill: { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
            name: "Gaurav Kumar", //your customer's name
            email: "gaurav.kumar@example.com",
            contact: "9000090000" //Provide the customer's phone number for better conversion rates 
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#3399cc"
        }
    };
    var rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to server, etc.)
  };

  return (
    <Container className="py-5" style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Book a Hotel Room</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e)=>{
              setname(e.target.value)
            }}
            placeholder="Enter your name"
            required
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={mail}
            onChange={(e)=>{
              setmail(e.target.value)
            }}            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group controlId="checkIn">
              <Form.Label>Check-in Date</Form.Label>
              <Form.Control
                type="date"
                value={checkin}
                onChange={(e)=>{
                  setcheckin(e.target.value)
                }}                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="checkOut">
              <Form.Label>Check-out Date</Form.Label>
              <Form.Control
                type="date"
                value={checkout}
                onChange={(e)=>{
                  setcheckout(e.target.value)
                }}                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="guests">
          <Form.Label>Number of Guests</Form.Label>
          <Form.Control
            as="select"
            value={guest}
            onChange={(e)=>{
              setguest(e.target.value)
            }}          >
            <option value={1}>1 Guest</option>
            <option value={2}>2 Guests</option>
            <option value={3}>3 Guests</option>
            {/* Add more options as needed */}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="message">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            value={text}
            onChange={(e)=>{
              settext(e.target.value)
            }}            rows={3}
            placeholder="Optional: Leave a message for the hotel"
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleChange}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default BookingForm;
