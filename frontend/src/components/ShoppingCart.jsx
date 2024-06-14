import React from 'react';
import { Typography, Button, Grid, IconButton } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material'; // Importar los íconos necesarios
import { useCart } from '../contexts/CartContext';

function ShoppingCart() {
    const { cartItems, removeFromCart, addMoreToCart, removeOneFromCart, clearCart } = useCart();

    const calculateTotalPrice = (item) => {
        return item.price * item.quantity;
    };

    const calculateCartTotal = () => {
        return cartItems.reduce((total, item) => total + calculateTotalPrice(item), 0);
    };

    const getCheckoutUrl = async () => {
        const body = {
            line_items: cartItems.map(item => ({
                price: item.priceId,
                quantity: item.quantity
            })),
            customer_email: localStorage.getItem('user')
        }
        const response = await fetch('http://localhost:4000/stripe/create-checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        window.open(data.url, '_blank');
        return data;
    }

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Shopping Cart Page
            </Typography>
            <Typography variant="h6" gutterBottom>
                Cart Items:
            </Typography>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {cartItems.map(item => (
                    <li key={item.id} style={{ marginBottom: '10px' }}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <img src={item.imageUrl} alt={item.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                                <Typography variant="body1" component="span">
                                    {item.name} - ${item.price} - Quantity: {item.quantity} - Total: ${calculateTotalPrice(item)}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <IconButton color="primary" onClick={() => removeFromCart(item.id)}>
                                    <Remove />
                                </IconButton>
                                <IconButton color="primary" onClick={() => addMoreToCart(item.id)}>
                                    <Add />
                                </IconButton>
                                <IconButton color="error" onClick={() => removeOneFromCart(item.id)}>
                                    <Delete />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </li>
                ))}
            </ul>
            <Typography variant="h6" gutterBottom>
                Total Cart Price: ${calculateCartTotal()}
            </Typography>
            <Button variant="outlined" color="error" onClick={clearCart} style={{ marginRight: '10px' }}>
                Clear Cart
            </Button>
            <Button variant="contained" color="primary" onClick={() => getCheckoutUrl()}>
                Buy
            </Button>
        </div>
    );
}

export default ShoppingCart;
