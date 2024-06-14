export interface Product {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    price: string;
    stock: number;
    category: string;
    priceId: string;
    isActive: boolean;
}

export interface Items{
    id: number;
    quantity: number;
    priceAtPurchase: string;
    product: Product;
    order: Order
}

export interface Order{
    id: number;
    total: string;
    createdAt: string;
    items: Items[];
}
