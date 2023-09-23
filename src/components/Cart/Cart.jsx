import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import CartItem from "../CartItem/CartItem";
import styles from "./Cart.module.css";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const { cart, clearCart, totalQuantity, total } = useContext(CartContext);

  if (totalQuantity === 0) {
    return (
      <div className={`container ${styles.cart_body}`}>
        <h1 className={styles.empty_cart_title}>
          Ups! el carrito de compras esta vacío.
        </h1>
        <Link to="/" className="btn btn-warning">
          Ir al Inicio
        </Link>
      </div>
    );
  }

  return (
    <div className={`container ${styles.cart_body}`}>
      <AnimatePresence>
        {cart.map((p, index) => (
          <motion.div
            key={p.id}
            className={styles.cart_item}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, delay: index * 0.2 }}
          >
            <CartItem {...p} />
          </motion.div>
        ))}
      </AnimatePresence>
      <h3 className={styles.cart_total}>Total: ${total}</h3>
      <div className={styles.cart_buttons}>
        <button onClick={() => clearCart()} className="btn btn-danger">
          Vaciar Carrito
        </button>
        <Link to="/checkout" className="btn btn-secondary">
          Compra tu TOYOTA
        </Link>
      </div>
    </div>
  );
};

export default Cart;
