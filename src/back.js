//ARRAY DE PRODUCTOS
import {
  doc,
  addDoc,
  getDoc,
  getDocs,
  collection,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

//FUNCION PARA OBTENER UN PRODUCTO POR ID
export const getProduct = (id) => {
  return new Promise((resolve, reject) => {
    const db = getFirestore();
    const itemDoc = doc(db, "items", id);
    getDoc(itemDoc)
      .then((doc) => {
        if (doc.exists()) {
          resolve({ id: doc.id, ...doc.data() });
        } else {
          resolve(null);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//FUNCION PARA OBTENER TODOS LOS PRODUCTOS DE UNA CATEGORIA
export const getProducts = (categoryId) => {
  return new Promise((resolve, reject) => {
    const db = getFirestore();
    const itemCollection = collection(db, "items");
    let q;
    if (categoryId) {
      q = query(itemCollection, where("categoryId", "==", categoryId));
    } else {
      q = query(itemCollection);
    }
    getDocs(q)
      .then((querySnapshot) => {
        const products = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        resolve(products);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const createOrder = (order)=>{
  const db = getFirestore();
  const ordersCollection = collection(db, "orders");
  return addDoc(ordersCollection, order)
}
