import { useContext, useState, Fragment } from "react";
import { CartContext } from "../../context/CartContext";
import { serverTimestamp } from "firebase/firestore";
import { createOrder } from "../../back";
import Field from "../Field/Field";
import { ClipLoader } from "react-spinners";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import styles from "./Checkout.module.css";

const Checkout = () => {
  const { cart, total, clearCart } = useContext(CartContext);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
  });

  if (isLoading) {
    return (
      <div className="loader">
        <ClipLoader color="#ffc107" size={50} />
      </div>
    );
  }

  const cartOrder = (cart) => {
    return cart.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      price: item.price,
      title: item.title,
    }));
  };

  const updateStock = (cart) => {
    const db = getFirestore();
    cart.forEach((item) => {
      const stockDoc = doc(db, "items", item.id);
      updateDoc(stockDoc, { stock: item.stock - item.quantity });
    });
  };

  const { name, phone, email } = formState;
  const onChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleCheckout = () => {
    const order = {
      buyer: {
        name: formState.name,
        phone: formState.phone,
        email: formState.email,
      },
      items: cartOrder(cart),
      total,
      date: serverTimestamp(),
    };
    setIsLoading(true);
    createOrder(order).then((docRef) => {
      setOrderId(docRef.id);
      setIsLoading(false);
      updateStock(cart);
      clearCart();
    });
  };

  const isFormValid = name && phone && email;
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={`container ${styles.checkout_body}`}>
      {orderId && (
        <div className="container p-5">
          <p className={styles.checkout_congrats}>
            Gracias por tu compra {name}, el id de la orden es:
            <br />
            <span className={styles.checkout_order}>{orderId}</span>
          </p>
        </div>
      )}
      {!orderId && (
        <>
          <h2 className={styles.checkout_title}>Resumen de la compra</h2>
          <ul className={styles.checkout_list}>
            {cart.map((item) => (
              <Fragment key={item.id}>
                <li className={styles.checkout_items}>
                  <p>{item.title}</p>
                  <p>Cantidad: {item.quantity}</p>
                  <p>Precio unitario: ${item.price}</p>
                  <p>Subtotal: ${item.price * item.quantity}</p>
                </li>
                <hr />
              </Fragment>
            ))}
          </ul>
          <p className={styles.checkout_total}>Total de la compra: ${total}</p>
          <div>
            <h4 className={styles.form_title}>
              Ingresa tus datos para completar la compra.
            </h4>
            <form
              className={`form-control ${styles.checkout_form}`}
              onSubmit={onSubmit}
            >
              <Field label="Nombre " name="name" onChange={onChange} />
              <Field label="Telefono " name="phone" onChange={onChange} />
              <Field label="Email " name="email" onChange={onChange} />
              <button
                className={`btn mt-4 btn-danger ${styles.form_button}`}
                disabled={!isFormValid}
                type="submit"
                onClick={handleCheckout}
              >
                Finalizar compra
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
export default Checkout;
