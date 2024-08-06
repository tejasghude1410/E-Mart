import React, { useEffect } from 'react'

import { useState } from 'react';
import ItmCard from '../components/ItmCard/ItmCard.jsx';
import { useNavigate } from 'react-router-dom';

import CarouselComponent from '../components/Carousel/CarouselComponent.jsx';

function Home() {
  let navigate = useNavigate();
  const [maincategories, setMaincategories] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8080/api/Category/getCatNameByParentId/0')
      .then(response => response.json())
      .then(data => {
        setMaincategories(data)
        console.log(data)
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  console.log(maincategories)
  const handleClick = (id, flag) => {
      if (flag) {
      navigate(`/s/${id}`);
    } else navigate(`/p/${id}`);
    
  }
  return (

    <div>
       <div className='home'>
    
        <div className='carousel'>
        <CarouselComponent/>
         </div>

       </div>
  
  <h3 style={{margin:'30px',marginTop:'-100px', align : 'center' , color:'red' }}>Browse By Category</h3>
   <div >
     <div
       style={{
         display: 'grid',
         gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
         gap: '20px',
         margin: '0 auto',
         maxWidth: '1200px', 
       }}
     >
       {maincategories?.map((i) => (
         <div
           key={i.catmasterID}
           onClick={() => handleClick(i.catmasterID, i.childflag)}
           style={{ cursor: 'pointer' }} 
         >
           <ItmCard title={i.categoryName} img={i.catImgPath} />
         </div>
       ))}
     </div>
   </div>
   </div>
 );
};

    

export default Home


