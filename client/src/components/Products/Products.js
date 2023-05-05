import { Fragment } from "react";
import ProductsSum from "./ProductsSum";
import AvailableProducts from "./AvailableProducts";

const Products = () => {
    return <Fragment>
        <ProductsSum />
        
        <AvailableProducts />
    </Fragment>
};

export default Products;