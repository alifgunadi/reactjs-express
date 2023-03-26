import Input from "../../components/Input";
import "./index.scss";
import { useState } from "react";
import axios from "axios";

const Tambah = () => {
  const [product, setProduct] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/v1/product/", {
        product,
        name,
        price,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Add Product</h2>
        <br />
        <form onSubmit={saveProduct}>
          <Input
            name="product"
            type="text"
            onChange={(e) => setProduct(e.target.value)}
            placeholder="Product..."
            label="Product"
            value={product}
          />
          <Input
            name="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Product Name..."
            label="Product Name"
            value={name}
          />
          <Input
            name="price"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price..."
            label="Price"
            value={price}
          />
          <Input name="status" type="checkbox" label="Active" onCheck />
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Tambah;
