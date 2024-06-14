import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PurchaseHistory from './components/PurchaseHistory';
import ShoppingCart from './components/ShoppingCart';
import ProductsListing from './components/ProductsList';
import ProductDetail from './components/ProductDetail';
import ResponsiveAppBar from './MaterialUI/AppBar';
import { ProductsProvider } from './contexts/ProductsContext';
import { CartProvider } from './contexts/CartContext';
import { ProductHistoryProvider } from './contexts/ProductHistoryContext'; // Importa el contexto de ProductHistory

function App() {
    return (
        <CartProvider>
            <ProductsProvider>
                <ProductHistoryProvider>
                    <Router>
                        <div className="App">
                            <nav>
                                <ResponsiveAppBar />
                            </nav>
                            <Routes>
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/purchase" element={<PurchaseHistory />} />
                                <Route path="/cart" element={<ShoppingCart />} />
                                <Route path="/products" element={<ProductsListing />} />
                                <Route path="/products/:id" element={<ProductDetail />} />
                                <Route path="/" element={<Login />} />
                            </Routes>
                        </div>
                    </Router>
                </ProductHistoryProvider>
            </ProductsProvider>
        </CartProvider>
    );
}

export default App;