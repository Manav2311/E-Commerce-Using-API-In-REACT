import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";

function ReviewProduct({ productId }) {
  const [Star, setStar] = useState([1, 2, 3, 4, 5]);
  const [activStar, setActivStar] = useState(0);
  const [review, setReview] = useState({});
  const [allReview, setAllReview] = useState([]);

  useEffect(() => {
    getReview();
  }, []);

  const getReview = async () => {
    const productReview = await fetch(
      `http://localhost:3000/review/?productId=${productId}`
    );
    const data = await productReview.json();
    setAllReview(data);
  };

  const getInpute = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const handleDeleteReview = async (id) => {
    await fetch(`http://localhost:3000/review/${id}`, { method: "DELETE" });
    getReview();
  };

  const addReview = async (e) => {
    e.preventDefault();
    const obj = { ...review, star: activStar, productId };

    await fetch("http://localhost:3000/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    setReview({});
    setActivStar(0);
    getReview();
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow-sm">
            <h4 className="mb-3">Add a Review</h4>
            <Form onSubmit={addReview}>
              <div className="mb-3">
                {Star.map((v, i) => (
                  <FaStar
                    key={i}
                    onClick={() => setActivStar(i + 1)}
                    style={{
                      color: activStar > i ? "gold" : "lightgray",
                      cursor: "pointer",
                      fontSize: "1.5rem",
                      marginRight: "5px",
                    }}
                  />
                ))}
                
                  <span className="text-danger fs-4 px-2 py-1  text-center" onClick={() => setActivStar(0)}> <IoIosCloseCircleOutline/> </span>
                
              </div>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  placeholder="Write your review..."
                  value={review.description || ""}
                  onChange={getInpute}
                />
              </Form.Group>
              <Button type="submit" variant="secondary">Submit Review</Button>
            </Form>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        {allReview.map((rev) => (
          <>
            <Col md={8} className="mx-auto mb-3" key={rev.id}>
              <Card
                className="position-relative shadow-sm border-0"
                style={{ borderRadius: "12px" }}
              >
                <Card.Body>
                  {/* Delete Button */}
                  <Button
                    variant="danger"
                    className="fs-4"
                    size="lg"
                    onClick={() => handleDeleteReview(rev.id)}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      borderRadius: "50%",
                      padding: "0.3rem 0.5rem",
                      lineHeight: "4",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <IoIosCloseCircleOutline />
                  </Button>

                  {/* Star Rating */}
                  <div className="mb-2">
                    {[...Array(rev.star)].map((_, j) => (
                      <FaStar
                        key={j}
                        style={{ color: "gold", marginRight: "3px" }}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <Card.Text style={{ fontSize: "1rem", color: "#333" }}>
                    {rev.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </>
        ))}
      </Row>
    </Container>
  );
}

export default ReviewProduct;
