import React, { useEffect, useState } from "react";
import "./App.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleRemove = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} onRemove={handleRemove} />
      ))}
    </div>
  );
};

const ProductItem = ({ product, onRemove }) => {
  return (
    <div className="product-item" onDoubleClick={() => onRemove(product.id)}>
      <img src={product.thumbnail} alt={product.title} width="350" height="250" />
      <h3>{product.title}</h3>
      <p>Price: ${product.price}</p>
      <Stars rating={product.rating} />
    </div>
  );
};

const Stars = ({ rating }) => {
  const fullStars = Math.round(rating);
  return (
    <div>
      {[...Array(5)].map((_, index) => (
        <span key={index} className={`fa fa-star ${index < fullStars ? "active" : ""}`}></span>
      ))}
    </div>
  );
};

const Header = () => {
  const scrollToFooter = () => {
    document.getElementById("footer").scrollIntoView({ behavior: "smooth" });
  };
  return (
    <header>
      <h1>ITEM SHOP BY DUNKYOUNG</h1>
      <button onClick={scrollToFooter}>Scroll to Footer</button>
    </header>
  );
};

const Footer = () => <footer id="footer">&copy; 2025 ITEM SHOP BY DUNKYOUNG</footer>;

const App = () => {
  return (
    <div>
      <Header />
      <ProductList />
      <Footer />
    </div>
  );
};

export default App;
