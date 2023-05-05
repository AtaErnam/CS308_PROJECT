import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './ProductsItemForm.module.css';

const ProductsItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const [showOutOfStockPopup, setShowOutOfStockPopup] = useState(false);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > props.maxStock
    ) {
      setAmountIsValid(false);
      return;
    }

    if (enteredAmountNumber > props.stock) {
      setShowOutOfStockPopup(true);
      return;
    }
    if (enteredAmountNumber > props.maxStock) {
      setShowOutOfStockPopup(true);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  const closePopupHandler = () => {
    setShowOutOfStockPopup(false);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label='Amount'
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: props.maxStock,
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>Add +</button>
      {!amountIsValid && <p>Invalid input.</p>}
      {showOutOfStockPopup && (
        <div className={classes.popup}>
          {props.stock > 0 && <p>Only {props.stock} product(s) in stock.</p>}
          {props.stock < 1 && <p>Out of stock.</p>}
          <button onClick={closePopupHandler}>OK</button>
        </div>
      )}
      
    </form>
  );
};

export default ProductsItemForm;