import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./Components/Product";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/header";
import ProductJsonServer from "./Components/Product using_json-server";
import AddProduct from "./Components/AddProduct";
import ViewProduct from "./Components/viewProduct";
import UpdateProduct from "./Components/UpdateProduct";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* <Route path="/" element={<Product />} /> */}
          <Route path="/" element={<ProductJsonServer />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/updateProduct/:id" element={<UpdateProduct />} />
          <Route path="/viewProduct/:id" element={<ViewProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
