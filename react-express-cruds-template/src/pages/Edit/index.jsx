import Input from "../../components/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Edit = () => {
  const [product, setProduct] = useState([]);
  const [nameProduct, setNameProduct] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('');
  const { id } = useParams();

  useEffect(() => {
    getProductById();
  });

  const getProductById = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/product/${id}`
      );
      setProduct(response.data.product);
      setNameProduct(response.data.nameProduct);
      setPrice(response.data.price);
    } catch (error) {
      console.log(error);
    }
  };
  
  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/v1/product/${id}`, {
        product,
        nameProduct,
        price,
        status,
      });
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form onSubmit={updateProduct}>
          <Input
            name="product"
            type="text"
            onChange={(e) => setProduct(e.target.value)}
            placeholder="Produk..."
            label="Product"
            value={product}
          />
          <Input
            name="name"
            type="text"
            onChange={(e) => setNameProduct(e.target.value)}
            placeholder="Nama Produk..."
            label="Name"
            value={nameProduct}
          />
          <Input
            name="price"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Harga Produk..."
            label="Harga"
            value={price}
          />
          <Input
            name="status"
            type="checkbox"
            label="Active"
            onCheck={(e) => setStatus(e.target.checked)}
            value={status}
          />

          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
