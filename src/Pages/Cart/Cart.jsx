import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const [isCardHolder, setIsCardHolder] = useState(false);
  const [points, setPoints] = useState(0);
  const [isRedeemingPoints, setIsRedeemingPoints] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [totalAmount,setTotalAmount] = useState(0);

  const navigate = useNavigate();
console.log('carditems', cartItems)
console.log('prod details', productDetails)
const fetchCartItemsFun = async () => {
  const res = await fetch(`http://localhost:8080/api/Cart/cust/` + localStorage.getItem("custId"))
      .then((response) => response.json())
      .then((data) => {
        return data;
        setCartItems(data);        
        
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
      setCartItems(res)
      console.log('cart items', res);
      
      const productIDs = [...new Set(res.map(item => item.prodID))];
        await fetchProductDetails(productIDs);
        calculateTotalAmount(res)
} 

  useEffect(() => {
    if (localStorage.getItem("islogin") !== "true") {
      navigate(`/login`);
      return;
    }

    // Fetch cart items
    fetchCartItemsFun();

    fetch('http://localhost:8080/api/Customer/isCardHolder/' + localStorage.getItem("custId"))
      .then((res) => res.json())
      .then((data) => {
        setIsCardHolder(data);
      })
      .catch((error) => {
        console.error("Error fetching isCardHolder status:", error);
      });

  }, []);

  
  useEffect(() => {

    if (isCardHolder) {
      fetch('http://localhost:8080/api/Customer/points/' + localStorage.getItem("custId"))
        .then((res) => res.json())
        .then((data) => {
          setPoints(data);
        })
        .catch((error) => {
          console.error("Error fetching isCardHolder status:", error);
        });

        
      
      const productIDs = [...new Set(cartItems.map(item => item.prodID))];
      fetchProductDetails(productIDs);
    }
  }, [cartItems, isCardHolder]);

  const fetchProductDetails = async (productIDs) => {
    console.log('prodID',productIDs);
    const productDetailsFetchPromises =await productIDs.map(id => (
      fetch(`http://localhost:8080/api/product/${id}`)
        .then(response => response.json())
        .then(data => ({ id, details: data })) 
    ));

    Promise.all(productDetailsFetchPromises)
      .then(detailsData => {
        const detailsObject = detailsData.reduce((obj, { id, details }) => {
          obj[id] = details;
          return obj;
        }, {});
        setProductDetails(detailsObject);
      })
      .catch(error => {
        console.error("Error fetching product details:", error);
      });
  };

  const handleIncrement = (index) => {
  const updatedCartItems = [...cartItems];
  updatedCartItems[index].qty += 1;
  setCartItems(updatedCartItems);


  updateCartItemQuantity(updatedCartItems[index].cartID, updatedCartItems[index].qty);
};

const handleDecrement = (index) => {
  const updatedCartItems = [...cartItems];
  if (updatedCartItems[index].qty > 1) {
    updatedCartItems[index].qty -= 1;
    setCartItems(updatedCartItems);

   
    updateCartItemQuantity(updatedCartItems[index].cartID, updatedCartItems[index].qty);
  }
};

const updateCartItemQuantity = async(cartItemId, newQuantity) => {
  
  await fetch(`http://localhost:8080/api/Cart/${newQuantity}/${cartItemId}`, {
    method: 'PUT'
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Quantity updated successfully:', data);
      fetchCartItemsFun()
    })
    .catch((error) => {
      console.error('Error updating quantity:', error);
    });
};


  const calculateTotalAmount = (items) => {
    console.log(items);

    let totalAmt = 0;
    items.forEach(item => {
      const product = productDetails[item.prodID];
      if (product) {
        totalAmt += isCardHolder ? (product.cardHolderPrice || product.offerPrice) * item.qty : product.offerPrice === 0 ? product.mrpPrice * item.qty : product.offerPrice * item.qty;
        
        
        console.log(totalAmt+"--------------")
      }
    });
    return setTotalAmount(totalAmt);
    
  };

  const handleRemove = (cartItemId) => {

    setCartItems(cartItems.filter(item => item.cartID !== cartItemId));
    
    fetch(`http://localhost:8080/api/Cart/${cartItemId}`, {
      method: 'DELETE'
    })
  };

  const placeOrder = () => {
    let TM;
    
    if(isRedeemingPoints) {
      TM = totalAmount - points
    }else {
      TM = totalAmount;
    }

    const invoiceData = {
      
      totalAmt: TM / 1.18,   
      tax: (TM / 1.18) * 0.18,
      deliveryCharge: 100,
      custID: parseInt(localStorage.getItem("custId")),
      invoiceDate: new Date().toISOString().split('T')[0], // Get current date
      totalBill: TM + 100, // Total amount + deliveryCharge
    };
  
    
    fetch('http://localhost:8080/api/invoice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invoiceData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Invoice created successfully:', data);
       


        cartItems.forEach(item => {
          const invoiceDetails = {
            mrp: productDetails[item.prodID]?.mrpPrice || 0,
            invoiceID: data.invoiceID, 
            prodID: item.prodID,
            pointsRedeem: productDetails[item.prodID]?.pointsRedeem || 0,
            cardHolderPrice: productDetails[item.prodID]?.cardHolderPrice || 0,
            prodName : productDetails[item.prodID]?.prodName || 0
          };
  
         
          fetch('http://localhost:8080/api/Invoicedetaails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(invoiceDetails),
          })
            .then(response => response.json())
            .then(detailData => {
              console.log('Invoice detail created successfully:', detailData);
              
            })
            .catch(error => {
              console.error('Error creating invoice detail:', error);
              
            });

            const timeoutId = setTimeout(() => {
              navigate('/invoice/'+data.invoiceID);
            }, 1500);
        });
  
        
      })
      .catch(error => {
        console.error('Error creating invoice:', error);
        
      });

      setIsButtonClicked(true);

  };
  
  

  const handlecheck = (e,prodid,prodPoint, discPer) => {        
    
    const finalPrice =   productDetails[prodid]?.cardHolderPrice
    
    if(e.target.checked){
      if(points >= prodPoint) {
        if(discPer!=0) {
          setTotalAmount(totalAmount - (finalPrice*discPer)/100)
        } else {
          setTotalAmount( totalAmount -  finalPrice)
        }
        setPoints(points - prodPoint);
      } else {
        window.alert("You dont have enough points")
        e.target.checked =false
      }
    }else 
    {
      setPoints(points + prodPoint);
      if(discPer!=0) {
        setTotalAmount(totalAmount + (finalPrice*discPer)/100)
      } else {
        setTotalAmount(totalAmount + finalPrice)
      }
      
    }
  } 
  

  const handleUpdatePoints = async (points) => {
    try {
      const response = await fetch(`http://localhost:8080/api/Customer/`+ localStorage.getItem("custId"), {
        method: 'PUT',        
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ points: points}),
        

      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Points updated successfully:', data);
    } catch (error) {
      console.error('Error updating points:', error);
    }
  };
  
  
  useEffect (() => { 
    if(productDetails){
      
  calculateTotalAmount(cartItems)
    }
  },[productDetails])

  // const totalAmount2 = calculateTotalAmount(cartItems);

  // useEffect (()=> {
  //   setTotalAmount(totalAmount2);
  // },[totalAmount2])

  const trial = (item,index) => {
      return <li key={item.cartID}>
      <div>
        <div>Product ID: {item.prodID}</div>
        <div>Product Name: {productDetails[item.prodID]?.prodName}</div>
        {(isCardHolder) ? (<div>Card Holder Price : ₹{productDetails[item.prodID]?.cardHolderPrice.toLocaleString()}</div>) : (productDetails[item.prodID]?.offerPrice.toLocaleString()) === 0 ? (<div>MRP: {productDetails[item.prodID]?.mrpPrice.toLocaleString()}</div>) : (<div>Offer Price: {productDetails[item.prodID]?.offerPrice.toLocaleString()}</div>)}
        {(isCardHolder) ? (productDetails[item.prodID]?.pointsRedeem!=0) ? (<div>Points to Redeem : {productDetails[item.prodID]?.pointsRedeem}</div>) : "" : ""}
        {(isCardHolder) ? (productDetails[item.prodID]?.pointsRedeem!=0) ? (productDetails[item.prodID]?.disc)==0 ? "100% Discount" : productDetails[item.prodID]?.disc+"% Discount" : "" : ""}
        <div>Quantity in Cart: {item.qty}</div>
        <div className="btn">
          <button onClick={() => handleIncrement(index)}>+</button>
          <button onClick={() => handleDecrement(index)}>-</button>
          <button className="remove-button" onClick={() => handleRemove(item.cartID)}>Remove</button>
          
          <input type="checkbox" disabled={productDetails[item.prodID]?.pointsRedeem === 0} onChange={(e) => handlecheck(e, item.prodID ,productDetails[item.prodID]?.pointsRedeem, productDetails[item.prodID]?.disc )} /> 
        </div>
      </div>
    </li>
  }
  
  return (
    <div className="cart-page">
      <h2>Your Points Are {points}</h2>
     
      <ul className="cart-items">
        {cartItems.map((item, index) => trial(item,index))}
      </ul>
      
      <div>
  <p>
    Total Cart Amount: ₹
    {totalAmount && totalAmount}
  </p>
</div>
      
<div className="place-order">
        {cartItems.length > 0 && (
          <button
            className={`place-order-button ${isButtonClicked ? 'clicked' : ''}`}
            onClick={()=>handleUpdatePoints(points)} >
            Place Order
          </button>
        )}
      </div>

    </div>
  );
};

export default Cart;