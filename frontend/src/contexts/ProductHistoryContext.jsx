import { createContext, useContext, useEffect, useState } from 'react';

const ProductHistoryContext = createContext([]);

export const ProductHistoryProvider = ({ children }) => {
    const [productHistory, setProductHistory] = useState([]);

    useEffect(() => {
        const fetchProductHistory = async () => {
            try {
                console.log("Fetching product history...");
                const response = await fetch("http://localhost:4000/orders", {
                    credentials: "include",
                });


                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }

                const contentType = response.headers.get('content-type');

                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error(`Expected application/json but received ${contentType}`);
                }

                const data = await response.json();
                setProductHistory(data);
            } catch (error) {
                console.error("Error fetching product history:", error);
            }
        };

        fetchProductHistory();
    }, []);

    return (
        <ProductHistoryContext.Provider value={productHistory}>
            {children}
        </ProductHistoryContext.Provider>
    );
};

export const useProductHistory = () => {
    return useContext(ProductHistoryContext);
};