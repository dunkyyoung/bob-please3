import React, { useEffect, useState, useCallback } from "react";
import "./App.css";


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching products");
        setLoading(false);
      });
  }, []);

  
  const handleRemove = useCallback((id) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  
  return (
    <div className="stars">
      {[...Array(5)].map((_, index) => {
        if (index < fullStars) {
          return <span key={index} className="fa fa-star active"></span>;
        }
        if (halfStar && index === fullStars) {
          return <span key={index} className="fa fa-star-half-o active"></span>;
        }
        return <span key={index} className="fa fa-star"></span>;
      })}
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


const Footer = () => (
  <footer id="footer">
    <p>&copy; 2025 ITEM SHOP BY DUNKYOUNG</p>
  </footer>
);


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
