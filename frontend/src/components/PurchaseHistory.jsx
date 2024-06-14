import React from 'react';
import { useProductHistory } from '../contexts/ProductHistoryContext';
import { Container, Typography, Grid } from '@mui/material';

const PurchaseHistory = () => {
    const productHistory = useProductHistory();

    const listItemStyle = {
        padding: '16px',
        borderBottom: '1px solid #ccc',
    };

    if (!productHistory.length) {
        return <div>No purchase history available</div>;
    }

    return (
        <Container style={{ marginTop: '32px' }}>
            <Typography variant="h3" component="h3" gutterBottom>
                Purchase History Page
            </Typography>
            <Typography variant="h5" component="h5" gutterBottom>
                Your Purchase History:
            </Typography>
            <Grid container spacing={2}>
                {productHistory.map(purchase => (
                    <Grid item xs={12} key={purchase.id} style={listItemStyle}>
                        <Typography variant="h6" component="p">
                            Date: {new Date(purchase.createdAt).toLocaleDateString()} {new Date(purchase.createdAt).toLocaleTimeString()}
                        </Typography>
                        <Typography variant="h6" component="p">
                            Total: ${purchase.total}
                        </Typography>
                        <Typography variant="body1" component="p">
                            Items: {purchase.items.map(item => (
                            <div key={item.id} style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={item.product.imageUrl} alt={item.product.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                                {item.product.name}
                            </div>
                        ))}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default PurchaseHistory;