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
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submittedReviews, setSubmittedReviews] = useState([]);

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

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    const newReview = { rating: rating, comment: comment };
    setSubmittedReviews([...submittedReviews, newReview]);
    setRating(0);
    setComment('');
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
      <div>
        <h4>Reviews</h4>
        {submittedReviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <ul>
            {submittedReviews.map((review, index) => (
              <li key={index}>
                <div>Rating: {review.rating}</div>
                <div>Comment: {review.comment}</div>
              </li>
            ))}
          </ul>
        )}
        <form onSubmit={handleReviewSubmit}>
          <div>
            <label htmlFor="rating">Rating:</label>
            <select id="rating" name="rating" value={rating} onChange={handleRatingChange}>
              <option value="0">Select rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div>
            <label htmlFor="comment">Comment:</label>
          <textarea id="comment" name="comment" value={comment} onChange={handleCommentChange}></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>  
    </li>
  );
};

export default ProductsItem;