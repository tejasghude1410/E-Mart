import "./product.css";
import db from "../../data/db";
import { useState } from "react";
import { GrFormClose } from "react-icons/gr";
//import Button from "../Button";

const Product = () => {
  const [detail, setDetail] = useState([]);
  const [closeModal, selCloseModal] = useState(false);

  const detailPage = (Product) => {
    setDetail([{ ...Product }]);
    selCloseModal(true);
  };

  return (
    <div className="container">
      {closeModal ? (
        <div className="detail-container">
          <div className="detail-contant">
            <button className="close" onClick={() => selCloseModal(false)}>
              <GrFormClose />
            </button>

            {detail.map((item, index) => (
              <div className="detail-info" key={index}>
                <div className="img-card">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="product-detail">
                  <h2 className="modal-title">{item.title}</h2>
                  <h3 className="modal-price">£ {item.price}</h3>
                  <p className="modal-desc">{item.desc}</p>
                  <button>Add To Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <h1>Product</h1>
      <section className="product">
        {db.map((product) => (
          <div className="card" key={product.id}>
            <div className="contant">
              <div className="card-img">
                <img src={product.image} alt={product.title} className="" />
              </div>

              <div className="detail">
                <div className="info">
                  <h3 className="title">{product.title}</h3>
                  <p className="price">£ {product.price}</p>
                </div>

                <button onClick={() => detailPage(product)}>
                  View Product
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Product;
