import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

function ProductCard({ product, addToCart }) {
    return (
        <Card sx={{ maxWidth: 345, margin: 2 }}>
            <CardMedia
                component="img"
                alt={product.name}
                height="140"
                image={product.imageUrl}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Price: ${product.price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => addToCart(product)}>Add to Cart</Button>
                <Button size="small" component={Link} to={`/products/${product.id}`}>More details</Button>
            </CardActions>
        </Card>
    );
}

export default ProductCard;
