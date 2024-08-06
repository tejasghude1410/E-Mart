import React, { useState , useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../Components/Product/ProductCard.jsx';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Product = () => {

    const [product,setProduct] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    let navigate = useNavigate();


    useEffect(() => {
        fetch('http://localhost:8080/api/product/getCatId/' + id)
          .then(response => response.json())
          .then(data => {
            setProduct(data);
            console.log(data);
          })
          .catch(error => console.error('Error fetching data:', error));
      }, [id]);

   if (loading) {
        return <div style={{display:'flex', justifyContent:'center',padding:'50px'}}><Spinner/></div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


  return (
    <div style={{ margin: '20px', display: 'flex', padding: '2%' }}>
        {product?.map((i) => (
          <div key={i.prodID}   style={{ padding: '10px' }}>
            <ProductCard id={i.prodID} 
                         prodDisc = {i.disc} 
                         prodPoints={i.pointsRedeem} 
                         prodName={i.prodName} 
                         imgpath={i.imgpath} 
                         prodShortDesc={i.prodShortDesc} 
                         offerPrice={i.offerPrice} 
                         mrpPrice={i.mrpPrice} 
                         prodLongDesc={i.prodLongDesc} />
          </div>
           ))}
    </div>
  )
}

export default Product