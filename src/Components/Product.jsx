import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Product = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    let getProduct = async () => {
      let fetchData = await fetch("https://fakestoreapi.com/products");
      let data = await fetchData.json();
      // console.log(data);
      setProductData(data);
      // console.log(productData);
    };

    getProduct();
  }, [setProductData]);

  const truncateString = (str) => {
    const words = str.split(" ");
    if (words.length > 30) {
      return words.slice(0, 30).join(" ");
    }
    return words.join(" ");
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        {productData.map((val, i) => {
          return (
            <Col md="auto">
              <Card style={{ width: "20rem", height: "20rem" }}>
                <Card.Img
                  variant="top"
                  src={val.image}
                  width={"18rem"}
                  style={{ objectFit: "contain" }}
                  height={"200px"}
                />
                <Card.Body>
                  <Card.Title>{val.title}</Card.Title>
                  <Card.Text>{truncateString(val.description)}...</Card.Text>
                  <Card.Text>{Math.ceil(val.price * 50)}</Card.Text>
                  <Button variant="danger">Delete</Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Product;
