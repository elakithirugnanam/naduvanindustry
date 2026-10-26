import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { Layout } from "../components";

// import './Gallery.css'

export default function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("naduvan_cart") || "[]")
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [placing, setPlacing] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );
  const deliveryCharge = subtotal >= 1000 ? 0 : cart.length ? 50 : 0;
  const total = subtotal + deliveryCharge;

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const updateQuantity = (index, difference) => {
    const updatedCart = [...cart];
    const item = updatedCart[index];

    if (item.quantity === 1 && difference === -1) {
      updatedCart.splice(index, 1);
    } else {
      item.quantity = Math.max(1, item.quantity + difference);
    }

    setCart(updatedCart);
    localStorage.setItem("naduvan_cart", JSON.stringify(updatedCart));
  };

  const placeOrder = async e => {
    e.preventDefault();

    if (!cart.length) {
      alert("Your cart is empty.");
      return;
    }

    try {
      setPlacing(true);

      const response = await api.post("/orders", {
        customer: form,
        items: cart,
        paymentMethod,
      });

      if (paymentMethod === "ONLINE") {
        alert(
          `Order created: ${response.data.orderId}\\n\\nOnline payment gateway is not connected yet. The order has been saved as Online Payment / Pending.`
        );
      } else {
        alert(`COD order placed: ${response.data.orderId}`);
      }

      localStorage.removeItem("naduvan_cart");
      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message || "Unable to place order"
      );
    } finally {
      setPlacing(false);
    }
  };

  const fields = [
    "name",
    "email",
    "phone",
    "address",
    "city",
    "pincode",
  ];

  return (
    <Layout>
      <section className="page-title">
        <small>CHECKOUT</small>
        <h1>Your order</h1>
      </section>

      <section className="checkout">
        <div className="cart-box">
          <h2>Cart</h2>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item, index) => (
              <div className="cart-row" key={item._id || index}>
                <img src={item.image} alt={item.name} />
                <div>
                  <b>{item.name}</b>
                  <span>{item.size || "100ml"} • ₹{Number(item.price).toFixed(0)}</span>

                  <div className="quantity">
                    <button type="button" onClick={() => updateQuantity(index, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(index, 1)}>+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <form className="checkout-form" onSubmit={placeOrder}>
          <h2>Delivery details</h2>

          {fields.map(field => (
            <input
              key={field}
              required={["name", "phone", "address"].includes(field)}
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            />
          ))}

          <div className="payment-method-box">
            <h3>Payment Method</h3>

            <label className={`payment-option ${paymentMethod === "COD" ? "selected" : ""}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={e => setPaymentMethod(e.target.value)}
              />
              <div>
                <b>Cash on Delivery</b>
                <span>Pay when your order arrives</span>
              </div>
            </label>

            <label className={`payment-option ${paymentMethod === "ONLINE" ? "selected" : ""}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="ONLINE"
                checked={paymentMethod === "ONLINE"}
                onChange={e => setPaymentMethod(e.target.value)}
              />
              <div>
                <b>Online Payment</b>
                <span>Pay online securely</span>
              </div>
            </label>
          </div>

          <div className="checkout-summary">
            <div><span>Subtotal</span><b>₹{subtotal.toFixed(0)}</b></div>
            <div><span>Delivery charge</span><b>{deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}</b></div>
            {deliveryCharge > 0 && <small>Free shipping on orders of ₹1000 or more.</small>}
            {deliveryCharge === 0 && subtotal > 0 && <small>You unlocked free shipping!</small>}
            <div className="checkout-total"><span>Total</span><b>₹{total.toFixed(0)}</b></div>
          </div>

          <button
            type="submit"
            className="green-btn"
            disabled={!cart.length || placing}
          >
            {placing
              ? "PLACING ORDER..."
              : paymentMethod === "ONLINE"
                ? "PLACE ONLINE ORDER →"
                : "PLACE COD ORDER →"}
          </button>
        </form>
      </section>
    </Layout>
  );
}




// import { useNavigate } from "react-router-dom";
// import api from "../api";
// import { Layout } from "../components";

// export default function Checkout() {
//   const navigate = useNavigate();

//   const [cart, setCart] = useState(
//     JSON.parse(localStorage.getItem("naduvan_cart") || "[]")
//   );

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     pincode: "",
//   });

//   const [paymentMethod, setPaymentMethod] = useState("COD");
//   const [placing, setPlacing] = useState(false);

//   const subtotal = cart.reduce(
//     (sum, item) =>
//       sum + Number(item.price) * Number(item.quantity),
//     0
//   );

//   const deliveryCharge =
//     subtotal >= 1000 ? 0 : cart.length ? 50 : 0;

//   const total = subtotal + deliveryCharge;

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const updateQuantity = (index, difference) => {
//     const updatedCart = [...cart];
//     const item = updatedCart[index];

//     if (item.quantity === 1 && difference === -1) {
//       updatedCart.splice(index, 1);
//     } else {
//       item.quantity = Math.max(
//         1,
//         Number(item.quantity) + difference
//       );
//     }

//     setCart(updatedCart);

//     localStorage.setItem(
//       "naduvan_cart",
//       JSON.stringify(updatedCart)
//     );
//   };

//   const loadRazorpay = () => {
//     return new Promise((resolve) => {
//       if (window.Razorpay) {
//         resolve(true);
//         return;
//       }

//       const existingScript = document.querySelector(
//         'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
//       );

//       if (existingScript) {
//         existingScript.addEventListener("load", () =>
//           resolve(true)
//         );
//         existingScript.addEventListener("error", () =>
//           resolve(false)
//         );
//         return;
//       }

//       const script = document.createElement("script");

//       script.src =
//         "https://checkout.razorpay.com/v1/checkout.js";

//       script.onload = () => resolve(true);

//       script.onerror = () => resolve(false);

//       document.body.appendChild(script);
//     });
//   };

//   const placeOrder = async (e) => {
//     e.preventDefault();

//     if (!cart.length) {
//       alert("Your cart is empty.");
//       return;
//     }

//     if (
//       !form.name ||
//       !form.phone ||
//       !form.address
//     ) {
//       alert("Please fill name, phone and address.");
//       return;
//     }

//     try {
//       setPlacing(true);

//       // =========================
//       // COD
//       // =========================

//       if (paymentMethod === "COD") {
//         const response = await api.post("/orders", {
//           customer: form,
//           items: cart,
//           paymentMethod: "COD",
//         });

//         alert(
//           `COD order placed successfully!\n\nOrder ID: ${response.data.orderId}`
//         );

//         localStorage.removeItem("naduvan_cart");

//         navigate("/");

//         return;
//       }

//       // =========================
//       // LOAD RAZORPAY
//       // =========================

//       const razorpayLoaded = await loadRazorpay();

//       if (!razorpayLoaded) {
//         alert(
//           "Razorpay failed to load. Please check your internet connection."
//         );

//         setPlacing(false);

//         return;
//       }

//       // =========================
//       // CREATE RAZORPAY ORDER
//       // =========================

//       const response = await api.post("/orders", {
//         customer: form,
//         items: cart,
//         paymentMethod: "ONLINE",
//       });

//       const {
//         razorpayOrderId,
//         amount,
//         currency,
//         keyId,
//         customer,
//         items,
//         subtotal: serverSubtotal,
//         deliveryCharge: serverDeliveryCharge,
//         total: serverTotal,
//       } = response.data;

//       // =========================
//       // OPEN RAZORPAY
//       // =========================

//       const options = {
//         key: keyId,

//         amount,

//         currency,

//         name: "Naduvan Industry",

//         description: "Natural Care Products",

//         order_id: razorpayOrderId,

//         prefill: {
//           name: customer.name,

//           email: customer.email || "",

//           contact: customer.phone,
//         },

//         notes: {
//           city: customer.city || "",
//           pincode: customer.pincode || "",
//         },

//         theme: {
//           color: "#111111",
//         },

//         handler: async function (paymentResponse) {
//           try {
//             const verifyResponse = await api.post(
//               "/orders/verify-payment",
//               {
//                 razorpay_order_id:
//                   paymentResponse.razorpay_order_id,

//                 razorpay_payment_id:
//                   paymentResponse.razorpay_payment_id,

//                 razorpay_signature:
//                   paymentResponse.razorpay_signature,

//                 customer,

//                 items,

//                 subtotal: serverSubtotal,

//                 deliveryCharge: serverDeliveryCharge,

//                 total: serverTotal,
//               }
//             );

//             alert(
//               `Payment successful!\n\nOrder ID: ${verifyResponse.data.orderId}`
//             );

//             localStorage.removeItem("naduvan_cart");

//             navigate("/");
//           } catch (error) {
//             console.error(
//               "Payment verification error:",
//               error
//             );

//             alert(
//               error.response?.data?.message ||
//                 "Payment verification failed."
//             );

//             setPlacing(false);
//           }
//         },

//         modal: {
//           ondismiss: function () {
//             setPlacing(false);
//           },
//         },
//       };

//       const razorpay = new window.Razorpay(options);

//       razorpay.on(
//         "payment.failed",
//         function (response) {
//           console.error(
//             "Payment failed:",
//             response.error
//           );

//           alert(
//             response.error?.description ||
//               "Payment failed. Please try again."
//           );

//           setPlacing(false);
//         }
//       );

//       razorpay.open();
//     } catch (error) {
//       console.error("Order error:", error);

//       alert(
//         error.response?.data?.message ||
//           "Unable to place order."
//       );

//       setPlacing(false);
//     }
//   };

//   const fields = [
//     "name",
//     "email",
//     "phone",
//     "address",
//     "city",
//     "pincode",
//   ];

//   return (
//     <Layout>
//       <section className="page-title">
//         <small>CHECKOUT</small>
//         <h1>Your order</h1>
//       </section>

//       <section className="checkout">
//         <div className="cart-box">
//           <h2>Cart</h2>

//           {cart.length === 0 ? (
//             <p>Your cart is empty.</p>
//           ) : (
//             cart.map((item, index) => (
//               <div
//                 className="cart-row"
//                 key={`${item._id || index}-${item.size || "default"}`}
//               >
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                 />

//                 <div>
//                   <b>{item.name}</b>

//                   <span>
//                     {item.size || "100ml"} • ₹
//                     {Number(item.price).toFixed(0)}
//                   </span>

//                   <div className="quantity">
//                     <button
//                       type="button"
//                       onClick={() =>
//                         updateQuantity(index, -1)
//                       }
//                     >
//                       -
//                     </button>

//                     <span>{item.quantity}</span>

//                     <button
//                       type="button"
//                       onClick={() =>
//                         updateQuantity(index, 1)
//                       }
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         <form
//           className="checkout-form"
//           onSubmit={placeOrder}
//         >
//           <h2>Delivery details</h2>

//           {fields.map((field) => (
//             <input
//               key={field}
//               required={[
//                 "name",
//                 "phone",
//                 "address",
//               ].includes(field)}
//               name={field}
//               value={form[field]}
//               onChange={handleChange}
//               placeholder={
//                 field.charAt(0).toUpperCase() +
//                 field.slice(1)
//               }
//             />
//           ))}

//           <div className="payment-method-box">
//             <h3>Payment Method</h3>

//             <label
//               className={`payment-option ${
//                 paymentMethod === "COD"
//                   ? "selected"
//                   : ""
//               }`}
//             >
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 value="COD"
//                 checked={paymentMethod === "COD"}
//                 onChange={(e) =>
//                   setPaymentMethod(e.target.value)
//                 }
//               />

//               <div>
//                 <b>Cash on Delivery</b>
//                 <span>
//                   Pay when your order arrives
//                 </span>
//               </div>
//             </label>

//             <label
//               className={`payment-option ${
//                 paymentMethod === "ONLINE"
//                   ? "selected"
//                   : ""
//               }`}
//             >
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 value="ONLINE"
//                 checked={
//                   paymentMethod === "ONLINE"
//                 }
//                 onChange={(e) =>
//                   setPaymentMethod(e.target.value)
//                 }
//               />

//               <div>
//                 <b>Online Payment</b>
//                 <span>
//                   Pay online securely with Razorpay
//                 </span>
//               </div>
//             </label>
//           </div>

//           <div className="checkout-summary">
//             <div>
//               <span>Subtotal</span>
//               <b>₹{subtotal.toFixed(0)}</b>
//             </div>

//             <div>
//               <span>Delivery charge</span>
//               <b>
//                 {deliveryCharge === 0
//                   ? "FREE"
//                   : `₹${deliveryCharge}`}
//               </b>
//             </div>

//             {deliveryCharge > 0 && (
//               <small>
//                 Free shipping on orders of ₹1000 or
//                 more.
//               </small>
//             )}

//             {deliveryCharge === 0 &&
//               subtotal > 0 && (
//                 <small>
//                   You unlocked free shipping!
//                 </small>
//               )}

//             <div className="checkout-total">
//               <span>Total</span>
//               <b>₹{total.toFixed(0)}</b>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="green-btn"
//             disabled={!cart.length || placing}
//           >
//             {placing
//               ? paymentMethod === "ONLINE"
//                 ? "OPENING PAYMENT..."
//                 : "PLACING ORDER..."
//               : paymentMethod === "ONLINE"
//               ? "PAY ONLINE →"
//               : "PLACE COD ORDER →"}
//           </button>
//         </form>
//       </section>
//     </Layout>
//   );
// }
