import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Grid, Button, CircularProgress } from '@mui/material';
import { useCart } from '../contexts/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart(); // Utiliza el contexto del carrito

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:4000/products/${id}`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`No se encontró el producto con el ID ${id}`);
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
          <CircularProgress />
        </Grid>
    );
  }

  if (error) {
    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
          <Typography variant="h5" color="error">
            {error.message}
          </Typography>
        </Grid>
    );
  }

  return (
      <Grid container justifyContent="center" style={{ padding: '20px' }}>
        {product ? (
            <Card sx={{ maxWidth: 600 }}>
              <CardMedia
                  component="img"
                  alt={product.name}
                  height="400"
                  image={product.imageUrl}
                  title={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="h6" component="div" style={{ marginTop: '10px' }}>
                  Price: ${product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{ marginTop: '10px' }}>
                  Stock: {product.stock}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '20px' }}
                    onClick={() => addToCart(product)} // Llama a la función addToCart
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
        ) : (
            <Typography variant="h5" color="textSecondary">
              No product found
            </Typography>
        )}
      </Grid>
  );
}

export default ProductDetail;
