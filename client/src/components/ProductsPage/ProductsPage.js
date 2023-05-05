import { Box, Image, Button } from "@chakra-ui/react";
import Card from "../Card/Card";

const ProductsPage = () => {

    const myProducts = [
        {_id:0, title: "RTX4090 GPU", price: 1400},
        {_id:1, title: "Steelseries Keyboard", price: 250},
        {_id:2, title: "Logitech Mouse", price: 100},
        {_id:3, title: "Razer Headphone", price: 200},
      ];

    return (
            <div>
                {myProducts.map((item, index) => (
                    <Box w="20%" key={item._id}>
                        <Card item={item}/>
                    </Box>
                ))}
            </div>
        
    );
}

export default ProductsPage;