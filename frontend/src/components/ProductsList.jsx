import React from 'react';
import ProductCard from '../MaterialUI/Card';
import { useProducts } from '../contexts/ProductsContext';
import { useCart } from '../contexts/CartContext'; // Asegúrate de que la ruta de importación es correcta

function ProductsListing() {
    const { products, loading, error } = useProducts();
    const { addToCart } = useCart(); // Utiliza el contexto del carrito

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading products: {error.message}</div>;
    }

    if (!Array.isArray(products) || products.length === 0) {
        return <div>No products available</div>;
    }

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {products.map(product => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
        </div>
    );
}

export default ProductsListing;
