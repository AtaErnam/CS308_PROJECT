import React, { useState } from "react";
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
    stock: "0",
  },
  {
    id: "p2",
    name: "Samsung Galaxy Tab S7+",
    description: "Powerful tablet with an immersive display",
    price: 18849.99,
    category: "Tablet",
    stock: "1",
  },
  {
    id: "p3",
    name: "ASUS ROG Zephyrus G14",
    description: "Gaming laptop with top-tier performance",
    price: 25499.99,
    category: "PC",
    stock: "5",
  },
  {
    id: "p4",
    name: "Sony WH-1000XM4",
    description: "Noise-cancelling headphones with exceptional audio quality",
    price: 5649.99,
    category: "Headphone",
    stock: "150",
  },
  {
    id: "p5",
    name: "Apple Watch Series 6",
    description: "Smartwatch with advanced health features",
    price: 5399.99,
    category: "Smart Watch",
    stock: "150",
  },
  {
    id: "p6",
    name: "Dell UltraSharp 27 Monitor",
    description: "27-inch monitor with stunning resolution",
    price: 19499.99,
    category: "PC tools",
    stock: "150",
  },
  {
    id: "p7",
    name: "Logitech G502 HERO Gaming Mouse",
    description: "High-performance mouse for gamers",
    price: 679.99,
    category: "PC tools",
    stock: "10",
  },
  {
    id: "p8",
    name: "Canon EOS R6 Mirrorless Camera",
    description: "Professional-grade camera with exceptional image quality",
    price: 32499.99,
    category: "Camera",
    stock: "3",
  },
];

const AvailableProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [sortByPrice, setSortByPrice] = useState(null);
  const [searchDescription, setSearchDescription] = useState("");

  const filteredProducts = DummyProducts.filter((product) => {
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;

    const matchesSearch =
      !searchText ||
      product.name.toLowerCase().includes(searchText.toLowerCase());

    const matchesDescription =
      !searchDescription ||
      product.description
        .toLowerCase()
        .includes(searchDescription.toLowerCase());

    return matchesCategory && matchesSearch && matchesDescription;
  })
    .sort((a, b) => {
      if (sortByPrice === "asc") {
        return a.price - b.price;
      } else if (sortByPrice === "desc") {
        return b.price - a.price;
      } else {
        return 0;
      }
    });

  const productsList = filteredProducts.map((product) => (
    <ProductsItem
      id={product.id}
      key={product.id}
      name={product.name}
      description={product.description}
      price={product.price}
      category={product.category}
      stock={product.stock}
    />
  ));
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Search by product name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </form>
      <form>
        <input
          type="text"
          placeholder="Search by product description"
          value={searchDescription}
          onChange={(e) => setSearchDescription(e.target.value)}
        />
      </form>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All categories</option>
        <option value="Phone">Phone</option>
        <option value="Tablet">Tablet</option>
        <option value="PC">PC</option>
        <option value="Headphone">Headphone</option>
        <option value="Smart Watch">Smart Watch</option>
        <option value="PC tools">PC tools</option>
        <option value="Camera">Camera</option>
      </select>
      <div className={classes["sort-buttons"]}>
        <div color="white">Sort by price:</div>

        <button
          className={classes["sort-button"]}
          onClick={() => setSortByPrice("asc")}
        >
          Ascending
        </button>
        <button
          className={classes["sort-button"]}
          onClick={() => setSortByPrice("desc")}
        >
          Descending
        </button>
      </div>

      <section className={classes.products}>
        <Card>
          <ul>{productsList}</ul>
        </Card>
      </section>
    </div>
  );
};

export default AvailableProducts;
