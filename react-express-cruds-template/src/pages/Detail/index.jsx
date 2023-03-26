import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './index.scss';

const Detail = () => {
  const [product, setProduct] = useState({});
  const id = useParams();
  console.log(id);

  useEffect(() => {
    getId();
  });
  
  const getId = async (id) => {
    try {
      const data = await axios.get(`http://localhost:5000/api/v1/product/${id}`);
      setProduct(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">Back</Link>
      
      <table className="table">
        <tbody>
          <tr key={product}>
            <td>ID</td>
            <td>{product._id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{product.name}</td>
          </tr>
          <tr>
            <td>Product Name</td>
            <td>{product.product}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>{product.price}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Detail;
