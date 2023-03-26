import { Link } from 'react-router-dom';
import './index.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Home = () => {

  const [products, setProduct] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get('http://localhost:5000/api/v1/product/');
    setProduct(response.data)
  };
  
  const getProductById = async (id) => {
    try {
      await axios.get(`http://localhost:5000/api/v1/product/${id}`);
      setProduct();
    } catch (error) {
      console.log(error);
    }
  }; 

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/product/${id}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return(
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">Add Product</Link>
      <div className="search">
        <input type="text" placeholder="Masukan kata kunci..."/>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th className="text-center">ID</th>
            <th className="text-center">Product</th>
            <th className="text-center">Name</th>
            <th className="text-center">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
          <tr key={product._id}>
            <td className="text-center">{index + 1}</td>
            <td className="text-center">{product.product}</td>
            <td className="text-center">{product.name}</td>
            <td className="text-center">{product.price}</td>
            <td className="text-center">
              <Link to="/detail" onClick={() => getProductById(product._id)} className="btn btn-sm btn-info">Detail</Link>
              <Link to="/edit" className="btn btn-sm btn-warning">Edit</Link>
              <Link to="#" onClick={() => deleteProduct(product._id)} className="btn btn-sm btn-danger">Delete</Link>
            </td>
          </tr>

          ))}
         
        </tbody>
      </table>
    </div>
  )
}

export default Home;