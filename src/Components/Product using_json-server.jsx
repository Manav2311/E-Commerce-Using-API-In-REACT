import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FiEye, FiTrash2, FiEdit } from "react-icons/fi";

const ProductJsonServer = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  let getProduct = async () => {
    let fetchData = await fetch("http://localhost:3000/products");
    let data = await fetchData.json();
    setProductData(data);
  };

  let handleDelete = async (id) => {
    await fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    });
    getProduct();
  };

  return (
    <Container className="mt-4">
      <Row className="g-4">
        {productData.map((val, i) => (
          <Col key={i} md={4}>
            <Card className="h-100 shadow-sm rounded bg-light">
              <div className="text-center p-3">
                <Card.Img
                  variant="top"
                  src={val.image}
                  style={{
                    height: "200px",
                    objectFit: "contain",
                    width: "100%",
                  }}
                  className="border rounded bg-white"
                />
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title>{val.title}</Card.Title>
                <Card.Text className="flex-grow-1">
                  {val.description.slice(0, 100)}...
                </Card.Text>
                <Card.Text className="fw-bold text-primary">
                  ${val.price}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Link to={`/viewProduct/${val.id}`}>
                    <Button variant="info">
                      <FiEye className="me-1" /> View
                    </Button>
                  </Link>
                  <div>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(val.id)}
                    >
                      <FiTrash2 className="me-1" /> Delete
                    </Button>
                    <Link to={`/updateProduct/${val.id}`}>
                      <Button variant="primary" className="ms-2">
                        <FiEdit className="me-1" /> Edit
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductJsonServer;
