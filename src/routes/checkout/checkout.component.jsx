import { useContext } from "react";
import CheckoutItem from "../../components/checkout-item/checkout-item";

import { CartContext } from "../../context/cart.context";

import "./checkout.styles.scss";

const Checkout = () => {
  const { cartItems, cartTotal } =
    useContext(CartContext);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Desciption</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>

      {cartItems.map((cartItem) => (
        <CheckoutItem cartItem={cartItem} key={cartItem.id} />
      ))}
      <span className="total"> Total:${cartTotal}</span>
    </div>
  );
};

export default Checkout;