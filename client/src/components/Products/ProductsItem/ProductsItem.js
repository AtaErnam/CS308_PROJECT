import { useContext } from 'react';
import ProductsItemForm from "./ProductsItemForm";
import classes from "./ProductsItem.module.css";
import CartContext from '../../../store/cartContext';

const ProductsItem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `₺${props.price.toFixed(2)}`;

  const addToCartHandler = amount => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
      category: props.category
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
        <ProductsItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default ProductsItem;
