import { useCart } from "../../contexts/CartContext";
import { Box, Button, Text, Flex } from "@chakra-ui/react";

const ItemQuantityCounter= ({ item }) => {
    const { items, addToCart, removeFromCart } = useCart();

    return (
        <Box borderWidth="1px" borderRadius="lg" display="inline-block">
            <Flex alignItems="center">
                <Button colorScheme="red" variant="outline" onClick={() => removeFromCart(item._id)}>-</Button>
                <Text mx={5}>{item.quantity}</Text>
                <Button colorScheme="green" variant="outline" onClick={() => addToCart(item, item)}>+</Button>
            </Flex>
        </Box>
    );
}

export default ItemQuantityCounter;