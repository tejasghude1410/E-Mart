/*import React, { useEffect } from 'react'
import Images from '../../components/Images'
import { useState } from 'react';
import ItmCard from '../Components/ItmCard.jsx';
import { useNavigate } from 'react-router-dom';

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
  const handleClick = (id, flag) => {
      if (flag) {
      navigate(`/s/${id}`);
    } else navigate(`/p/${id}`);
  }
  return (
    <div>
      <Images />
      <div style={{ margin: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
  {maincategories?.map((i) => (
    <div key={i.catmasterID} onClick={() => { handleClick(i.catmasterID, i.childflag) }}>
      <ItmCard title={i.categoryName} img={i.catImgPath} text={i.shortDisc} />
    </div>
  ))}
</div>


    </div>
  )
}

export default Home*/


