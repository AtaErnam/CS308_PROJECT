import { useContext, useState } from "react";
import ProductsItemForm from "./ProductsItemForm";
import classes from "./ProductsItem.module.css";
import CartContext from "../../../store/cartContext";
import Modal from "react-modal";

const ProductsItem = (props) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  
  const cartCtx = useContext(CartContext);
  const price = `₺${props.price.toFixed(2)}`;
  const [isOutOfStockOpen, setIsOutOfStockOpen] = useState(false);

  const addToCartHandler = (amount) => {
    if (props.stock === 0) {
      setIsOutOfStockOpen(true);
      return;
    }

    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
      category: props.category,
      stock: props.stock,
    });
  };

  return (
    <li className={classes.product}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <ProductsItemForm
          id={props.id}
          stock={props.stock}
          onAddToCart={addToCartHandler}
        />
      </div>
      <Modal isOpen={isOutOfStockOpen} style={customStyles}>
        <h2>Out of Stock!</h2>
        <button onClick={() => setIsOutOfStockOpen(false)}>Close</button>
      </Modal>
    </li>
  );
};

export default ProductsItem;
