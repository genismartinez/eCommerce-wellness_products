import authHeader from "../consts/authHeader";
import {api} from "../consts/apiConsts";

export const login = async (username, password) => {
    const response = await fetch("http://localhost:4000/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include", // Incluir credenciales (cookies)
        body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
};

export const register = async (username, email, password) => {
    const response = await api.post("/users/signup", {
        username,
        email,
        password,
    });
    return response.data;
};

export const getProducts = async () => {
    const products = await api.get("/products", { headers: authHeader() });
    return products.data;
};

export const fetchProduct = async (id) => {
    const response = await api.get(`/products/${id}`, {
        headers: authHeader(),
    });
    return response.data;
};

export const createCheckoutSession = async (cart, email) => {
    const response = await api.post(
        "/stripe/create-checkout-session",
        {
            line_items: getLineItems(cart),
            customer_email: email,
        },
        {
            headers: authHeader(),
        }
    );
    return response.data;
};

export const fetchPurchases = async () => {
    const response = await api.get("/purchases", {
        headers: authHeader(),
    });
    return response.data;
};

const getLineItems = (cart) => {
    return cart.map((item) => ({
        price: item.stripePriceId,
        quantity: item.amount,
    }));
};
