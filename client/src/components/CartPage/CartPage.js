import { useRef, useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { Link } from "react-router-dom";
import { DeleteIcon } from '@chakra-ui/icons'
import {
	Alert,
	Image,
	Button,
	Box,
	Text,
	ButtonGroup
} from "@chakra-ui/react";
import ItemQuantityCounter from "../ItemQuantityCounter/ItemQuantityCounter";

function CartPage() {
	const { items, emptyCart } = useCart();
	const total = items.reduce((acc, obj) => acc + obj.quantity * obj.price, 0);

	return (
		<Box p="5">
			{items.length < 1 && (
				<Alert status="warning">You have not any items in your basket.</Alert>
			)}

			{items.length > 0 && (
				<>
					<ul style={{ listStyleType: "decimal" }}>
						{items.map((item) => (
							<li key={item._id} style={{ marginBottom: 15 }}>
								{/* <Link to={`/product/${item._id}`}> */}
									<Text fontSize="18">
										{item.title} - ${item.price}
									</Text>
									{/* <Image
										htmlWidth={200}
										loading="lazy"
										src={item.photos[0]}
										alt="basket item"
									/> */}
								{/* </Link> */}

								{/* <Button
									mt="2"
									size="sm"
									colorScheme="red"
									onClick={() => removeFromCart(item._id)}
								>
									Remove from basket
								</Button> */}
                                Quantity: <ItemQuantityCounter item={item}/>
							</li>
						))}
					</ul>

					<Box mt="10">
						<Text fontSize="22">Total: ${total}</Text>
					</Box>

                    <ButtonGroup gap="4">
					<Button mt="2" size="md" colorScheme="green">
						Order
					</Button>
                    <Button mt="2" size="md" colorScheme="red" variant="outline" leftIcon={<DeleteIcon/>}
                     onClick={() => emptyCart()}>
						Empty Cart
					</Button>
                    </ButtonGroup>
                    
				</>
			)}
		</Box>
	);
}

export default CartPage;