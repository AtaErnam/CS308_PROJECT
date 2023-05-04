import Card from "../UI/Card";
import ProductsItem from "./ProductsItem/ProductsItem";
import classes from "./AvailableProducts.module.css";
const DummyProducts = [
  {
    id: "p1",
    name: "iPhone 12 Pro",
    description: "Apple smartphone with cutting-edge technology",
    price: 20999.99,
    category: "Phone",
  },
  {
    id: "p2",
    name: "Samsung Galaxy Tab S7+",
    description: "Powerful tablet with an immersive display",
    price: 18849.99,
    category: "Tablet",
  },
  {
    id: "p3",
    name: "ASUS ROG Zephyrus G14",
    description: "Gaming laptop with top-tier performance",
    price: 25499.99,
    category: "PC",
  },
  {
    id: "p4",
    name: "Sony WH-1000XM4",
    description: "Noise-cancelling headphones with exceptional audio quality",
    price: 5649.99,
    category: "Headphone",
  },
  {
    id: "p5",
    name: "Apple Watch Series 6",
    description: "Smartwatch with advanced health features",
    price: 5399.99,
    category: "Smart Watch",
  },
  {
    id: "p6",
    name: "Dell UltraSharp 27 Monitor",
    description: "27-inch monitor with stunning resolution",
    price: 19499.99,
    category: "PC tools",
  },
  {
    id: "p7",
    name: "Logitech G502 HERO Gaming Mouse",
    description: "High-performance mouse for gamers",
    price: 679.99,
    category:"PC tools",
  },
  {
    id: "p8",
    name: "Canon EOS R6 Mirrorless Camera",
    description: "Professional-grade camera with exceptional image quality",
    price: 32499.99,
    category: "Camera",
  },
];

const AvailableProducts = () => {
  const productsList = DummyProducts.map((product) => (
    <ProductsItem
      id={product.id}
      key={product.id}
      name={product.name}
      description={product.description}
      price={product.price}
      category={product.category}
    />
  ));
  return (
    <section className={classes.products}>
      <Card>
        <ul>{productsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableProducts;
