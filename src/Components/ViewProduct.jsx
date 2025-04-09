import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const ViewProduct = () => {
  const [productData, setProductData] = useState([]);
  let navigate = useNavigate()
  let { id } = useParams();

  console.log(id);
  useEffect(() => {
    let productData = async () => {
      let data = await fetch(`http://localhost:3000/products/?id=${id}`);
      let showData = await data.json();

      setProductData(showData);
    };
    productData();
  }, [setProductData]);

  return (
    <div>
      {productData.map((val) => (
        <>
          <Container>
            <Row className="mt-3">
              <Col>
                <img
                  src={val.image}
                  alt={val.title}
                  style={{ width: "200px" }}
                />
              </Col>
              <Col>
                <h2>{val.title} <></> </h2>
                <span className="fs-5 mb-2">{val.description}</span>
                <br />
                <span className="fs-4 mt-2">${val.price}</span>
              </Col>
            </Row>
          </Container>
        </>
      ))}
    </div>
  );
};

export default ViewProduct;
