import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const CartWidget = () => {
  const { totalQuantity } = useContext(CartContext);
  return (
    <Link to="/cart">
      <button className="btn ">
        <Icon className="cart-icon display-6" icon="raphael:cart" />
        <span
          style={{ visibility: totalQuantity > 0 ? "visible" : "hidden" }}
          className="badge rounded-pill bg-danger fs-6"
        >
          {totalQuantity}
        </span>
      </button>
    </Link>
  );
};

export default CartWidget;
