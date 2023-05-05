import { useState, createContext, useContext, useEffect } from "react";

const CartContext = createContext();

const defaultCart = JSON.parse(localStorage.getItem("cart")) || [];

const CartProvider = ({ children }) => {
	const [items, setItems] = useState(defaultCart);

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(items));
	}, [items]);

	const addToCart = (data, findCartItem) => {
        if(!findCartItem){
            data.quantity=1;
            setItems((items) => [data, ...items]);
        } else{
            const newItems = [...items];
            const itemIndex = newItems.findIndex(item => item._id === findCartItem._id);
            newItems[itemIndex] = {
                ...newItems[itemIndex],
                quantity: newItems[itemIndex].quantity + 1
              };
            setItems(newItems);
        }
		
	};

	const removeFromCart = (item_id) => {
        let newItems = [...items];
        const itemIndex = newItems.findIndex(item => item._id === item_id);
		
        if(newItems[itemIndex].quantity > 1){
            newItems[itemIndex] = {
                ...newItems[itemIndex],
                quantity: newItems[itemIndex].quantity - 1
              };
        }else{
            newItems = newItems.filter((item) => item._id !== item_id);
        }
        
		setItems(newItems);
	};

    const getTotalQuantity = () => {
        let totalQuantity = 0;
        items.forEach((item) => {
            totalQuantity += item.quantity;
        });
        return totalQuantity;
    }

	const emptyCart = () => setItems([]);

	const values = {
		items,
		setItems,
		addToCart,
		removeFromCart,
		emptyCart,
        getTotalQuantity,
	};

	return (
		<CartContext.Provider value={values}>{children}</CartContext.Provider>
	);
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };