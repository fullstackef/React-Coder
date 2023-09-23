import { toast } from "react-toastify";

export const notify = () => {
  toast.success("Producto agregado al carrito", {
    position: "bottom-right",
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    autoClose: 1000,
    theme: "colored",
  });
};
