import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import styles from "./CartItem.module.css";
import { motion } from "framer-motion";

const CartItem = (item) => {
  const { removeItem } = useContext(CartContext);

  return (
    <div className={`container col-12 ${styles.cart_card}`}>
      <img
        src={`/img/${item.imageId}`}
        alt={item.title}
        className={`img-fluid ${styles.cart_img}`}
      />
      <h3 className={styles.cart_details}>{item.title}</h3>
      <p className={styles.cart_details}>${item.price}</p>
      <p className={styles.cart_details}>x {item.quantity}</p>
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={() => removeItem(item.id)}
        className={`btn btn-danger ${styles.cart_remove}`}
      >
        &times;
      </motion.button>
    </div>
  );
};

export default CartItem;
