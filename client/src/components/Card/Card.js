import { Box, Image, Button } from "@chakra-ui/react";
import { useCart } from "../../contexts/CartContext";

function Card({ item }) {
	const { addToCart, items } = useCart();

    const findCartItem = items.find(
		(cart_item) => cart_item._id === item._id
	);

	return (
		<Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="3">
			
            {/* <Image src={item.photos[0]} alt="product" loading="lazy" /> */}

            <Box p="6">
                {/* <Box d="plex" alignItems="baseline">
                    {moment(item.createdAt).format("DD/MM/YYYY")}
                </Box> */}

                <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
                    {item.title}
                </Box>
                <Box>${item.price}</Box>
            </Box>
			

			<Button
				colorScheme={findCartItem ? "red" : "green"}
				variant="solid"
				onClick={() => addToCart(item, findCartItem)}
			>
				Add {findCartItem ? "(" + findCartItem.quantity + ")": ""}
			</Button>
		</Box>
	);
}

export default Card;