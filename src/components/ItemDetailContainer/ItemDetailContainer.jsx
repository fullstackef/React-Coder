import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../back";
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {
  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getProduct(id)
      .then((response) => {
        setItem(response);
      })
      .catch(() => {
        setItem(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  return <ItemDetail item={item} isLoading={isLoading} />;
};

export default ItemDetailContainer;
