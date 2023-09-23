import { useState } from "react";
import { useContext } from "react";
import propTypes from "prop-types";
import { ClipLoader } from "react-spinners";
import ItemCount from "../ItemCount/ItemCount";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import styles from "./ItemDetail.module.css";
import { motion } from "framer-motion";
import { notify } from "../../utils";

const ItemDetail = ({ item, isLoading }) => {
  if (isLoading) {
    return (
      <div className="loader">
        <ClipLoader color="333" size={50} />
      </div>
    );
  }

  if (!item)
    return (
      <div className={styles.not_found_body}>
        <img className={styles.ghost} src="/404.svg" alt="" />
        <h2 className={styles.not_found}>Producto no encontrado.</h2>
      </div>
    );
  const [quantityAdded, setQuantityAdded] = useState(0);
  const [newStock, setNewStock] = useState(item.stock);

  const { addItem } = useContext(CartContext);
  const handleOnAdd = (quantity) => {
    setQuantityAdded(quantity);
    addItem(item, quantity);
    setNewStock(item.stock - quantity);
    notify();
  };

  return (
    <div className={`container col-8 ${styles.item_detail_body}`}>
      <motion.div
        className={styles.product_image}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        <img src={`/img/${item.imageId}`} alt={item.title} />
      </motion.div>
      <div className={`card-body ${styles.product_details}`}>
        <h1 className="card-title">{item.title}</h1>
        <p className="card-text fw-bold">Descripción de {item.title}</p>
        {newStock === 0 ? (
          <p className={`card-text ${styles.no_stock}`}>Sin stock!</p>
        ) : (
          <p className={`card-text ${styles.stocked}`}>
            En stock ({newStock} disponibles)
          </p>
        )}
        <p className="card-text text-danger fw-bold fs-1">${item.price}</p>
      </div>
      {quantityAdded > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={styles.product_buttons}
        >
          <Link to="/cart" className="btn btn-secondary">
            Ir al garage de precompra
          </Link>
        </motion.div>
      ) : (
        <div className={styles.product_buttons}>
          <ItemCount initial={1} stock={item.stock} onAdd={handleOnAdd} />
        </div>
      )}
    </div>
  );
};

ItemDetail.propTypes = {
  item: propTypes.object,
  isLoading: propTypes.bool,
};

export default ItemDetail;
