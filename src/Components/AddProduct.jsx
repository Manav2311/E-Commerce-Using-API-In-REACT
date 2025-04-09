import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function AddProduct() {
  let [category, setCategory] = useState([""]);
  let [product, setProduct] = useState({});

  useEffect(() => {
    let getCategory = async () => {
      let getCatData = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      let cateData = await getCatData.json();
      setCategory(cateData);
    };
    getCategory();
  }, [setCategory]);

  let getInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setProduct({ ...product, [name]: value });
  };

  let submitData = async (e) => {
    e.preventDefault();
    console.log(product);
    let addPro = await fetch("http://localhost:3000/products", {
      method: "post",
      body: JSON.stringify(product),
    });
    if (addPro) {
      console.log("Product Insert");
    } else {
      console.log("Somthing Wrong");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center ">
        <Col md={8}>
          <div className="p-4 bg-light border rounded shadow">
            <h2 className="mb-4 text-dark text-center">Add Product Details</h2>
            <Form onSubmit={(e) => submitData(e)} method="post">
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="category"
                  onChange={(e) => getInput(e)}
                >
                  <option value="">--select Category--</option>
                  {category.map((v, i) => {
                    return (
                      <option key={i} value={v}>
                        {v}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Title
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="title"
                    onChange={(e) => getInput(e)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Price
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="number"
                    name="price"
                    onChange={(e) => getInput(e)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Description
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    onChange={(e) => getInput(e)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-4">
                <Form.Label column sm="2">
                  Image
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="image"
                    onChange={(e) => getInput(e)}
                  />
                </Col>
              </Form.Group>

              <div className="text-center">
                <Button type="submit" variant="secondary" className="px-4 fs-5">
                  Add Product
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AddProduct;
