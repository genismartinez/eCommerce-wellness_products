import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products...");
        const response = await fetch("http://localhost:4000/products", {
          credentials: "include",  // Asegúrate de que las cookies se envíen con la solicitud
        });
        console.log("Response:", response);

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');
        console.log("Content-Type:", contentType);

        if (!contentType || !contentType.includes('application/json')) {
          throw new Error(`Expected application/json but received ${contentType}`);
        }

        const data = await response.json();
        console.log("Data:", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
      <ProductsContext.Provider value={{ products, loading, error }}>
        {children}
      </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
